const ErrorResponse = require("../utils/errorResponse");
const Channel = require("../models/Channel");
const Message = require("../models/Message");

const chatController = (socket) => {
    const controller = {
        getChannels: async (req, res, next) => {
            const channels = await Channel.find({})
            return res.status(200).json({ success: true, channels });

        },
        getChannel: async (req, res, next) => {

            const messages = await Message.find({ channelId: req.params.channelId }).sort({ 'createdAt': 1 });
            //
            console.log(messages)
            return res.status(200).json({ success: true, messages });

        },
        postChannel: async (req, res, next) => {
            const channel = await Channel.create({
                name: req.body.name,
                participants: 0,
                sockets: [],
            }).then(async (data) => {
                const message = await Message.create({
                    channelId: data._id,
                    userName: "testChat",
                    content: "first Message",
                });
                console.log(message);
            });
            /* const message = await Message.create({
                
            }); */
            return res.status(200).json({ success: true, channel });
        },
        postMessage: async (req, res) => {
            data = req.body;
            const message = await Message.create({
                userName: data.userName,
                content: data.content,
                channelId: data.channelId,
            });
            //do a socket thing here!!!!!
            return res.status(200).json({ success: true, message });
        }
    }
    return controller;
}

module.exports = chatController;