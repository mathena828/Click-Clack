const express = require("express");
const userRouter = express.Router();
const userController = require('../controllers/users');

userRouter.post('/register', userController.register);
userRouter.post("/login",userController.login);
userRouter.get("/:userId",userController.profile);

module.exports = userRouter;