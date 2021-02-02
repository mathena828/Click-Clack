const express = require("express");
const userRouter = express.Router();
const userController = require('../controllers/users');


userRouter.post('/register', userController.register);

userRouter.post("/login",userController.login);
userRouter.get("/test",userController.test);

module.exports = userRouter;