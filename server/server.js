require('dotenv').config({path:',/config.env'});
const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const app = express();
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

connectDB();
app.use(express.json());

app.get("/", (req, res, next) => {
    res.send("Hello, World.")
});

app.use('api/users', require('./routes/users'));
app.use('api/chat', require('./routes/chat'));

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