const express = require("express");
const userRouter = express.Router();

const {
  login,
  register,
} = require("../controllers/users");

userRouter.route("/register").post(register);

userRouter.route("/login").post(login);

module.exports = userRouter;