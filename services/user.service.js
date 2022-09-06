const User = require('../models/user.model');
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken= (id) => {
    return jwt.sign({ id }, process.env.TOKEN_KEY, { expiresIn: "30d"});
};

const expiredToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_KEY, {expiresIn: "1ms"});
};

module.exports = {

    registerOneUser : async (username, email, password) => {

        let result = {};

        //check if user exists
        const userExists = await User.findOne({email});
        if (userExists) {
            throw new Error("User already exists");
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        if (user) {
           (result.success = true), (result.message = "User created successfully");
           result.data = {
            id: user._id,
            username: user.username,
            email: user.email,
           };
        }
        return result;
        
    },

    loginOneUser : async (/* userId,  */email, password) => { 

        let result = {};

        //check for user

        const user = await User.findOne ({ email });
        if (!user) {
            throw new Error("User not found");
        }

        const passwordCheck = await bcrypt.compare(password, user.password);
        if (user && passwordCheck) {
            (result.success = true), (result.message = "Login success!");

            result.data = {
                id: user._id,
                username: user.username,
                email: user.email,
            };

            result.token = generateToken(user._id);
        } else if (!passwordCheck) {
            throw new Error ('Password does not match!');
        }
            return result;
    },

    getUserProfile: async (user) => { // user

        let result = {};

        const userProfile = await User.findById(user);
        (result.success = true),
            (result.message = 'User' + user + 'retrieved successfully');
        result.data = userProfile;

        return result;

    },

    updateUserProfile: async (user, body) => { 
        let result = {};

        const userExists = await User.findById(user);
        if (!userExists) {
            throw new Error("User not found");
        }

        const updateProfile = await User.findByIdAndUpdate(user, body, {
            new: true,
        });

        result.success = 'true';
        result.message = `Updated user ${user} profile successfully`;
        result.data = updateProfile;
        
        return result;
    },

    logoutOneUser: async (user) => {
        let result = {};
        const userExists = await User.findById(user);
        if (userExists) {
            (result.success = true), (result.message = "Logout successfully!");
            result.data = {
                token: expiredToken(userExists._id),
            };
        }
        return result;
    }

}; 