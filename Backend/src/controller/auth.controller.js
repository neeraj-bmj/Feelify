const { JsonWebTokenError } = require("jsonwebtoken");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// register User api

async function registerUser(req, res) {
  const {
    userName,
    email,
    password,
    fullName: { firstName, lastName },
  } = req.body;
  console.log("🤷‍♀️register data in req.body==========",req.body);
  const isUserAvailable = await userModel.findOne({ email });
  if (isUserAvailable) {
    return res.status(401).JSON({
      message: "user already exist !",
    });
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    fullName: {
      firstName,
      lastName,
    },
    userName,
    email,
    password: hashPassword,
  });

  const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
  res.cookie("token", token);

  console.log("✅user Registered successful ✅", user);
  res.status(201).json({
    message: "User registered successfully",
    user,
  });
}

// login user api

async function loginUser(req, res) {
  const { email, password } = req.body;
  console.log("🤷‍♀️login data in req.body=========>",req.body);
  const isUserAvailable = await userModel.findOne({ email });
  if (!isUserAvailable) {
    return res.status(401).json({
      message: "User Not Found",
    });
  }

  const isValidPassword = await bcrypt.compare(
    password,
    isUserAvailable.password
  );
  if (!isValidPassword) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  try {
    const token = await jwt.sign( 
      { id: isUserAvailable._id },
      process.env.JWT_SECRET_KEY
    );
    res.cookie("token", token);

    console.log("✅user Logged in successful ===> ✅", isUserAvailable);
    res.status(200).json( {
      message: "user logged in successfully",
      isUserAvailable,
    });
  } catch (error) {
    return res.status(409).json({
      message: "Unauthorized user",
    }); 
  }
}

// user_profile api

async function userProfile(req, res) {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized user, missing token ! ",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const User = await userModel.find({ _id: decoded.id }).select("-password");

    if (!User) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    req.user = User;

    return res.status(200).json({
      message: "user fetched successfully",
      User,
    });
  } catch (error) {
    return res.status(409).json({
      message: "unauthorized user",
    });
  }
}

module.exports = {
  registerUser,
  loginUser,
  userProfile,
};
