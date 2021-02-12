require('dotenv').config()
const express = require('express');
const socketio = require('socket.io');
var cookieParser = require('cookie-parser');
var path = require('path');
const http = require('http');
const app = express();
const connectDB = require("./config/db");
//const seedDB = require("./config/seed");
const errorHandler = require("./middleware/error");


const Socket = require('./socket');
const server = http.createServer(app);
var socket = Socket(server);

const chatController=require('./controllers/chat')(socket);


var logger = require('morgan');
var cors = require('cors');

app.use(cors({credentials: false, origin: '*'}));
app.options('*', cors());

const chatRouter = require('./routes/chat')(chatController);
const userRouter = require('./routes/users');

connectDB();
//seedDB();
app.use(express.json());

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/users', userRouter);
app.use('/api/chat', chatRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () =>
  console.log(`Sever is running on port ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err.message}`);
    server.close(() => process.exit(1));
});