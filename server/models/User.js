const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "You need to provide a username."],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "You need to provide a valid email address."],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "You need to provide a password."],
    },
    isTeacher: {
        type: Boolean,
        default: false,
    },
});

UserSchema.pre("save", async function(next) {
    if(!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};
  
UserSchema.methods.getSignedJwtToken = function () {
    console.log(process.env.JWT_SECRET)
    return jwt.sign({ id: this._id }, `${process.env.JWT_SECRET}`, {
        expiresIn: '24h',
    });
};
  

const User = mongoose.model("User", UserSchema);
module.exports = User;