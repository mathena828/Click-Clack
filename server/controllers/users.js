const ErrorResponse = require("../utils/errorResponse");
const User = require("../models/User");

const controller = {
    register: async(req, res, next) => {
        const { username, email, password } = req.body;
        var isTeacher = false
        console.log(req.body)
        try {
            const user = await User.create({
                username,
                email,
                password,
                isTeacher,
            })
            var token = sendToken(user, 200);
            return res.status(200).json({ success: true, token, user });
        } catch (error) {
            next(error);
        }    
    },
    login: async(req, res, next) => {
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
            var token = sendToken(user, 200);
            return res.status(200).json({ success: true, token, user });
        } catch (error) {
            next(error);
        }
    }
}
const sendToken = (user, statusCode) => {
    const token = user.getSignedJwtToken();
    console.log(token)
    return token
    //res.status(statusCode).json({ success: true, token });
};
module.exports = controller;