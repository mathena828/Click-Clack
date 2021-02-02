const express = require("express");
const userRouter = express.Router();
const userController = require('../controllers/users');


userRouter.post('/api/users/register', userController.register);

userRouter.post("/api/users/login",userController.login);

userRouter.get("/api/users/test",userController.test);

module.exports = userRouter;