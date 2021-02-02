const mongoose = require('mongoose');
const ChannelSchema = new mongoose.Schema({
    name:{},
    participants:{}
})

const Channel = mongoose.model("Channel", ChannelSchema);
module.exports = Channel;