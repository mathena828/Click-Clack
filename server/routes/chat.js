const express = require("express");
const chatIndex = function (chatController) {


    const chatRouter = express.Router();
    const { protect } = require("../middleware/auth");

    chatRouter.route("/channels").get(chatController.getChannels, protect);
    chatRouter.route("/channels/users/:userId").get(chatController.getUserChannels, protect);
    chatRouter.route("/channels").post(chatController.postChannel, protect);
    chatRouter.route("/channels/join").put(chatController.joinChannel, protect);
    chatRouter.route("/channels/:channelId").get(chatController.getChannel, protect);
    chatRouter.route("/channels/:channelId").post(chatController.postMessage, protect);
    return chatRouter;
}
module.exports = chatIndex;