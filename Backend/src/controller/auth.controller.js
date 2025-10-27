const { JsonWebTokenError } = require("jsonwebtoken");
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { redisClient } = require("../db/redis");

// register User api

async function registerUser(req, res) {
  const {
    userName,
    email,
    password,
    fullName: { firstName, lastName },
  } = req.body;
  console.log("🤷‍♀️register data in req.body==========", req.body);
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

  const token = await jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "7d" } // token expired in 7 days
  );
  res.cookie("token", token);

  console.log("✅user Registered successful ✅", user);
  res.status(201).json({
    message: "User registered successfully",
    user,
    token, // include token here
  });
}

// login user api

async function loginUser(req, res) {
  const { email, password } = req.body;
  console.log("🤷‍♀️login data in req.body=========>", req.body);
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
      { id: isUserAvailable._id, email: isUserAvailable.email },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" } // token expired in 7 days
    );
    res.cookie("token", token);

    console.log("Token=======>", token);
    console.log("✅user Logged in successful ===> ✅", isUserAvailable);
    res.status(200).json({
      message: "user logged in successfully",
      isUserAvailable,
      token, // include token here
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
    // accept token from cookie OR from Authorization header (Bearer token)
    const token =
      req.cookies?.token ||
      (req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(" ")[1]);
    // console.log("token auth controller =============>",token);
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized user, missing token ! ",
      });
    }

    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    // return a single user object instead of an array
    const User = await userModel.findById(decoded.id).select("-password");

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

// logout api
async function logoutUser(req, res) {
  try {
    const { token } = req.cookies;
    console.log("token ==========>", token);

    // token = header.payload.DigitalSignature
    // header = version  ,  iterationCount Round
    // payload = email, userID
    // DigitalSignature = hash code of data from SHA256

    // sepret payload form token
    const payload = await jwt.decode(token);
    console.log("Payload ====>", payload);

    // stored token in Redis to add blocklist
    await redisClient.set(`token:${token}`, "Blocked");

    // token expired
    // await redisClient.expire(`token:${token}`, "7d");    // for static time hardcoded time value
    await redisClient.expireAt(`token:${token}`, payload.exp);

    // clear token from cookie
    // res.clearCookie("token", {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "None",
    // });
    //  OR
    res.cookie("token", null,{expires : new Date(Date.now())});

    res.status(200).json({
      message: "user logout successfully.",
    });
  } catch (err) {
    console.log("Error==============>", err);
  }
}

module.exports = {
  registerUser,
  loginUser,
  userProfile,
  logoutUser,
};
