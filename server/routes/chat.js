const express = require("express");
const chatRouter = express.Router();
const chatController = require('../controllers/chat');
const { protect } = require("../middleware/auth");

chatRouter.route("/channels").get(chatController.getChannels, protect);
chatRouter.route("/channels").post(chatController.postChannel, protect);
chatRouter.route("/channels/:channelId").get(chatController.getChannel, protect);
chatRouter.route("/channels/:channelId").post(chatController.postMessage, protect);


module.exports = chatRouter;