var online = {};
const Socket = (server)=>{
    var io = require('socket.io')(server, {
        cors: {
            origin: "*",
            methods: ["GET", "POST"],
            credentials: false
          }
    });
    io.on('connection', onConnect);
    function onConnect(socket){
        console.log('a user connected! ' + socket.id);
        socket.on('setSocketId',(userId)=>{
            online[userId] = socket.id;
            console.log('set online user ' + userId + ' with socket id ' + socket.id )
        })
        var previousId;
        const safeJoin = (currentId)=>{
            socket.leave(previousId);
            socket.join(currentId);
            previousId=currentId;
        };
        socket.on('getChannel',(data)=>{
            console.log(data);
            safeJoin(data.channelId);
            console.log("joining channel " + data.channelId);
            socket.emit('room',data.channelId);
        });
/*         
        
        socket.on('typing', (data) => {
            //console.log(data);
            socket.broadcast.in(data.room_id).emit('typing', {data: data, isTyping: true});
        });

        socket.on('notification',(data)=>{
            console.log("Sender: " + data.sender + " Receiver: " + data.receiver + " Message: " + data.message);
            io.to(online[data.receiver]).emit("newNotification", data);
        }); */
    
    }
    return io;
}
module.exports = Socket;