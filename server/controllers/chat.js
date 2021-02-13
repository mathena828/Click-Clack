const ErrorResponse = require("../utils/errorResponse");
const Channel = require("../models/Channel");
const Message = require("../models/Message");

const chatController = (socket) => {
    const controller = {
        getChannels: async (req, res, next) => {
            const channels = await Channel.find({})
            return res.status(200).json({ success: true, channels });

        },
        getUserChannels: async (req, res, next) => {
            const channels = await Channel.find({ participants: { $all: [req.params.userId] } })
            return res.status(200).json({ success: true, channels });

        },
        getChannel: async (req, res, next) => {

            const messages = await Message.find({ channelId: req.params.channelId }).sort({ 'createdAt': 1 });
            //
            console.log(messages)
            return res.status(200).json({ success: true, messages });

        },
        joinChannel: async (req,res,next)=>{
            try{
                var channel = await Channel.findOne({_id: req.body.channelId});
                if(!channel){
                    return next(new ErrorResponse("Channel Not Found", 401));
                }else{
                    channel.participants.push(req.body.userId);
                    channel.save();
                    return res.status(200).json({
                        success:true
                    });
                    
                }
            } catch(error){
                console.log(error);
                return next(new ErrorResponse("Invalid Code", 404));
            }
        },
        postChannel: async (req, res, next) => {
            const channel = await Channel.create({
                name: req.body.name,
                description: req.body.description,
                participants: [req.body.userId],
                sockets: [],
            }).then(async (data) => {
                const message = await Message.create({
                    channelId: data._id,
                    userName: "admin",
                    content: "Hello, world!",
                });
                console.log(message);
                console.log(data);
                return res.status(200).json({ success: true, channel:data });
            }).catch(()=>{
                return res.status(404).json({success:false, message: 'Creation failed'})
            });
        },
        postMessage: async (req, res) => {
            data = req.body;
            const message = await Message.create({
                userName: data.userName,
                content: data.content,
                channelId: data.channelId,
                school: data.school
            });
            socket.in(data.channelId).emit('newMessage',JSON.parse(JSON.stringify(message)));
            return res.status(200).json({ success: true, message });
        }
    }
    return controller;
}

module.exports = chatController;