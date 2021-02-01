const express = require("express");
const chatRouter = express.Router();
const { protect } = require("../middleware/auth");

module.exports = chatRouter;