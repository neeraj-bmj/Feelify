const mongoose = require("express");
const express = require("express");
const authController = require("../controller/auth.controller");
const { authUserMiddleware } = require("../middleware/auth.middleware");

const router = express.Router();

// POST     /api/user/auth/register
router.post("/register", authController.registerUser);

// POST     /api/user/auth/login
router.post("/login", authController.loginUser);

// GET     /api/user/auth/user_profile
router.get("/user_profile", authUserMiddleware , authController.userProfile);

// POST     /api/user/auth/logout
router.post("/logout", authUserMiddleware , authController.logoutUser);


module.exports = router;
