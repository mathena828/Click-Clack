const mongoose = require('mongoose');

const ChannelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "You need to provide a channel name."],
    },
    participants: [{ 
        type : String
    }],
    sockets: [{ 
        type : String,  
    }]
})

const Channel = mongoose.model("Channel", ChannelSchema);
module.exports = Channel;