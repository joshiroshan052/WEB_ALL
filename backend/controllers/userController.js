const { sendEmail } = require("../middleware/sendMail");
const Users = require("../model/userModel");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const generateToken = require('../middleware/auth');


const securePassword = async (password) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

const sendVerifyMail = async (firstName, email, user_id) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: "joshiroshan051@gmail.com",
        pass: "ohmu hnfz btgy isci",
      },
    });
    const mailOptions = {
      from: "joshiroshan051@gmail.com",
      to: email,
      subject: "For Verification mail",
      html: `<p>Hi, ${firstName} ,Please click here to <a href= "http://localhost:5000/api/user/verify/${user_id}"> Verify </a> your mail.</p>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email has been successfully sent:-", info.response);
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};


const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { firstName, lastName, email, phoneNo, password } = req.body;
    if (!firstName || !lastName || !email || !phoneNo || !password) {
      return res.json({
        success: false,
        message: "Please enter all fields.",
      });
    }
    let user = await Users.findOne({ email });
    if (user) {
      return res.json({ success: false, message: "User already exists" });
    }
    const spassword = await securePassword(req.body.password);

    // Create a new user
    user = new Users({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNo: req.body.phoneNo,
      password: spassword,
      is_admin: 0,
    });

    // Save the user to the database
    const userData = await user.save();

    // Send verification mail
    sendVerifyMail(firstName, email, userData._id);

    // Return success response
    res.status(200).json({
      success: true,
      message: "User Created Successfully. Please verify your email.",
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const verifyMail = async (req, res) => {
  try {
    console.log('Verify Mail Request Params:', req.params); // Check the request parameters
    const updateInfo = await Users.updateOne(
      {
        _id: req.params.id,
      },
      {
        $set: { is_verified: 1 },
      }
    );
    console.log('Update Info:', updateInfo); // Check the update info
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error('Verify Mail Error:', error); // Check the error message
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.json({
      success: false,
      message: "Please enter all fields.",
    });
  }

  try {
    const user = await Users.findOne({ email: email });

    if (!user) {
      return res.json({
        success: false,
        message: "User doesn't exist.",
      });
    }

    if (user.is_verified === 0) {
      return res.status(500).json({
        success: false,
        message: "Please verify your email first.",
      });
    }

    const databasePass = user.password;
    const isMatch = await bcrypt.compare(password, databasePass);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid Credentials.",
      });
    }

    // Generate a token for the user
    const token = generateToken(user._id);

    console.log('User LoggedIn Successfully:', user);

    res.status(200).json({
      success: true,
      message: "User LoggedIn Successfully.",
      token: token,
      useData: user,
    });
  } catch (error) {
    console.error('Error in loginUser:', error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};



const forgotPassword = async (req, res) => {
  try {
    const user = await Users.findOne({ email: req.body.email });
    
    if (!user) {
      return res.json({
        success: false,
        message: "Email not found.",
      });
    }
    if (user.is_verified === 0) {
      return res.json({
        success: false,
        message: "Please verify your email first.",
      });
    }
    const resetPasswordToken = user.getResetPasswordToken();

    await user.save();

    // Assuming you have a configuration variable for the frontend URL
    const frontendBaseUrl = process.env.FRONTEND_BASE_URL || "http://localhost:3000";
    const resetUrl = `${frontendBaseUrl}/password/reset/${resetPasswordToken}`;

    const message = `Reset Your Password by clicking on the link below: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: "Reset Password",
        message,
      });

      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save();

      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    const user = await Users.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid or has expired",
      });
    }

    const newPassword = await securePassword(req.body.password);
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



module.exports = {
  createUser,
  loginUser,
  verifyMail,
  forgotPassword,
  resetPassword,
};
