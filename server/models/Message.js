const mongoose = require('mongoose');
const MessageSchema = new mongoose.Schema({
    userName: {
        type: String
    },
    school: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String
    },
    channelId:{
        type: String
    }
});
const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;