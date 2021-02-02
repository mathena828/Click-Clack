require('dotenv').config()
const express = require('express');
const socketio = require('socket.io');
var cookieParser = require('cookie-parser');
var path = require('path');
const http = require('http');
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const router = require('./routes/index');
var logger = require('morgan');
var cors = require('cors');

connectDB();
app.use(express.json());
app

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.get("/", (req, res, next) => {
    res.send("Hello, World.")
});


app.use('/', router);
//app.use('api/chat', require('./routes/chat')); 
/* app.post('api/users/login', userRouter.login)
app.post('api/users/register', userRouter.register) */

app.use(errorHandler);



const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketio(server);
io.on('connection', (socket) => {
  console.log('Connected');
  socket.on('join', ({username, room}, callback) => {
    console.log(username, room);
  });
  socket.on('disconnect', () => {
    console.log("Disconnected");
  })
});
server.listen(PORT, () =>
  console.log(`Sever is running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});