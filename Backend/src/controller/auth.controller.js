const { JsonWebTokenError } = require("jsonwebtoken");
const userModel = require("../models/user.model");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


async function registerUser(req, res) {
    const {email, password, fullName : { firstName, lastName}} = req.body;
    const isUserAvailable = await userModel.findOne({email});
    if(isUserAvailable){
        return res.status(401).JSON({
            message : "user already exist !"
        })
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName : {
            firstName,
            lastName,
        },
        email,
        password : hashPassword,
    });

    const token = await jwt.sign({id : user._id}, process.env.JWT_SECRET_KEY)
    res.cookie("token", token);

    res.status(201).json({
        message : "User registered successfully",
        user
    })
}

module.exports = {
    registerUser
}