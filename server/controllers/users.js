const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

exports.register =  async(req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const user = await User.create({
            username,
            email,
            password,
            isTeacher,
        });
        sendToken(user, 200, res);
    } catch (error) {
        next(error);
    }
}

exports.login = async(req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorResponse("Please enter your email and password", 400));
    }
    try {
        const user = await User.findOne({email});
        if (!user) {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return next(new ErrorResponse("Invalid Credentials", 401));
        }
        sendToken(user, 200, res);
    } catch (error) {
        next(error);
    }
}

const sendToken = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode).json({ success: true, token });
};