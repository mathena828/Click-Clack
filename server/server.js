require('dotenv').config()
const express = require('express');
const socketio = require('socket.io');
var cookieParser = require('cookie-parser');
var path = require('path');
const http = require('http');
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");



var logger = require('morgan');
var cors = require('cors');

app.use(cors());
app.options('*', cors());

const chatRouter = require('./routes/chat');
const userRouter = require('./routes/users');

connectDB();
app.use(express.json());

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const STATIC_CHANNELS = [{
  id:1,
  name: 'first',
  participants:10,
  sockets:[]
},
{
  id:2,
  name: 'second',
  participants:1,
  sockets:[]
}];
app.use('/api/users', userRouter);
app.use('/api/chat', chatRouter);

app.get('/getChannels',(req,res)=>{
  res.json({
    channels: STATIC_CHANNELS
  })
})

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: false
  }
});

io.on('connection', (socket) => {
  console.log('Connected');
  socket.emit('connection',null);
  socket.on('channel-join',id=>{
    console.log("channel-join",id);
    STATIC_CHANNELS.forEach(c=>{
      if (c.id === id) {
        if (c.sockets.indexOf(socket.id) == -1) {
            c.sockets.push(socket.id);
            c.participants++;
            //console.log("same id",c);
            //io.emit('channel', c);
           // console.log("emit-channel",c)
        }
    } else {
      
        let index = c.sockets.indexOf(socket.id);
        if (index != -1) {
            c.sockets.splice(index, 1);
            c.participants--;
            //console.log("dif id",c)
            //io.emit('channel', c);
            //console.log("emit-channel",c)
        }
    }
    io.emit('channels',STATIC_CHANNELS);
    console.log(STATIC_CHANNELS);
    });
    
    return id;
  })
  socket.on('join', ({username, room}, callback) => {
    console.log(username, room);
  });
  socket.on('send-message', message => {
    console.log(message);
    //io.emit('message', message);
  });
  socket.on('disconnect', () => {
    console.log("Disconnected", socket.id);
    STATIC_CHANNELS.forEach(c=>{
      let index = c.sockets.indexOf(socket.id);
      if (index != (-1)){
        c.sockets.splice(index,1);
        c.participants--;
        
      }
    });
    io.emit('channels', STATIC_CHANNELS);
  })
});

server.listen(PORT, () =>
  console.log(`Sever is running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});