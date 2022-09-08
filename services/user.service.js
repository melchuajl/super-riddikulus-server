const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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


        //check for user

        const user = await User.findOne ({ email });
        if (!user) {
            throw new Error(`User with email ${email} not found!`);
        }

        const passwordCheck = await bcrypt.compare(password, user.password);
        
        if (!passwordCheck) {
            throw new Error("Password does not match");
        }

        if (passwordCheck) {
            const loginData = {
                id: user._id,
                email: user.email,
            };
          
        const token = jwt.sign(loginData, process.env.TOKEN_KEY, {
            expiresIn: "30d",
        });

        return token;
        }
    },

    getUserProfile: async (user) => { // user


        const userProfile = await User.findById(user);
        if (!userProfile) {
            throw new Error(`Profile ${user} cannot be fetched`)
        }


        return userProfile;

    },

    updateUserProfile: async (user, body) => { 
        

        const userExists = await User.findById(user);
        if (!userExists) {
            throw new Error("User not found");
        }

        const updateProfile = await User.findByIdAndUpdate(user, body, {
            new: true,
        });
  
        return updateProfile;
    },

    logoutOneUser: async (user) => {

        const userExists = await User.findById(user);
        if (!userExists) {
            throw new Error("User not found");
        } 

/*         const expiryToken = {
                token: expiredToken(userExists._id),
            }; */

            const loginData = {
                id: user._id,
                email: user.email,
            };

            const expiredToken = jwt.sign(loginData, process.env.TOKEN_KEY, {
                expiresIn: "1ms",
            });

            return expiredToken;
        }

    



}; 