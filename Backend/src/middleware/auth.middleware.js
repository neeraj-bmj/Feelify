const { redisClient } = require("../db/redis");
const userModel = require("../models/user.model");
const jwt = require('jsonwebtoken');

// Auth Middleware 
async function authUserMiddleware(req, res, next) {
  try {
    const token = req.cookies?.token || (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[1]);
    // console.log("token authMiddleware =============>",token); 
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized user, missing token ! ",
      });
    }

    // check token blocked or not he give ans 0 false 1 true
    const IsBlocked = await redisClient.exists(`token:${token}`);
    console.log("IsBlocked========>",IsBlocked);
    if (IsBlocked)
      throw new Error("Invalid token, Please login again.")

    // verify user with token
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const User = await userModel.findById({ _id: decoded.id }).select("-password");

    if (!User) {
      return res.status(404).json({
        message: "user not found",
      });
    }

    req.user = User;
    next();

    // return res.status(200).json({
    //   message: "user fetched successfully",
    //   User,
    // });
  } catch (error) {
    return res.status(409).json({
      message: "unauthorized user",
    });
  }
}



module.exports = {
    authUserMiddleware
}