const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    firstName: {
        type : String,
        required : true,
    },
    lastName: {
        type: String,
        required : true,
    },
    email: {
        type: String,
        required : true,
    },
    phoneNo: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    is_admin:{
        type:Number,
        required: true
    },
    is_verified: {
        type: Number,
        default:0
    },
    token:{
        type: String,
        default:''
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
});
userSchema.methods.generateToken = async function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
  };
userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  
    return resetToken;
  };
module.exports = mongoose.model("User", userSchema);