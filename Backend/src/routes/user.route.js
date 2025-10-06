const mongoose = require("express");
const express = require("express");
const authController = require("../controller/auth.controller");

const router = express.Router();

// POST     /api/user/auth/register
router.post("/register", authController.registerUser);

// POST     /api/user/auth/login
router.post("/login", authController.loginUser);

module.exports = router;
