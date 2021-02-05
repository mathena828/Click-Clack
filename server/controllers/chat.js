const ErrorResponse = require("../utils/errorResponse");
const Channel = require("../models/Channel");

const controller = {
    getChannels: async (req, res, next) => {
        const channels = await Channel.find({})
        return res.status(200).json({ success: true, channels });
    },
    postChannel:  async (req, res, next) => {
        const channel = await Channel.create({
            name: req.body.name,
            participants: 0,
            sockets: [],
        });
        return res.status(200).json({ success: true, channel });
    }
}

module.exports = controller;