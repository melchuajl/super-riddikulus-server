const User = require('../models/user.model');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {

    registerOneUser: async (username, email, password, gender, house) => {

        let result = {};

        //check if user exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new Error("Email already in use!");
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        //create user
        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            gender,
            house
        });

        if (user) {
            (result.success = true), (result.message = "User created successfully");
            result.data = {
                id: user._id,
                username: user.username,
                email: user.email,
                gender: user.gender,
                house: user.house
            };
        }
        return result;
    },

    loginOneUser: async (/* userId,  */email, password) => {

        //check for user

        const user = await User.findOne({ email });
        if (!user) {
            throw new Error(`Your email is incorrect. Please try again.`);
        }

        const passwordCheck = await bcrypt.compare(password, user.password);

        if (!passwordCheck) {
            throw new Error("The password you entered is incorrect. Please try again.");
        }

        if (passwordCheck) {
            const loginData = {
                id: user._id,
                email: user.email,
            };

            const token = jwt.sign(loginData, process.env.TOKEN_KEY, {
                expiresIn: "30d",
            });

            const returnData = {
                id: user._id,
                username: user.username,
                email: user.email,
                gender: user.gender,
                house: user.house,
                token: token
            }

            return returnData;
        }
    },

    getUserProfile: async (user) => {

        const userProfile = await User.findById(user);
        if (!userProfile) {
            throw new Error(`Profile ${user} cannot be fetched`)
        }

        return userProfile;
    },

    updateUserPassword: async(user, oldPass, newPass, confirmPass) => {

        const userExists = await User.findById(user);
        if (!userExists) {
            throw new Error(`User ${user} not found`);
        } else if (newPass !== confirmPass) {
            throw new Error (`New Passwords does not match!`)
        } else if (!oldPass || !newPass || !confirmPass){
            throw new Error (`Please input Password!`)
        }

        const passwordCheck = await bcrypt.compare(oldPass, userExists.password);
        
        if (!passwordCheck) {
            throw new Error("The old password you entered is incorrect. Please try again.");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPass, salt);

        const updatePassword = await User.findByIdAndUpdate(user, {password:hashedPassword}, {
            new: true,
        });
  
        return updatePassword;
    },

    updateUserProfile: async (user, body) => { 
        
        const userExists = await User.findById(user);
        console.log('User', user)
        if (!userExists) {
            throw new Error("User not found");
        }

        const updateProfile = await User.findByIdAndUpdate(user, body, {
            new: true,
        });
  
        updateProfile.save();
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
    },


    addOneSpell: async (user, body) => {

        const userExists = await User.findById(user);
        if (!userExists) {
            throw new Error(`User ${user} not found`);
        } else if (userExists.spells.some((item) => item.id == body.id) === true) {
            throw new Error(`${body.name} already saved!`)
        }


        const newSpell = await User.findByIdAndUpdate(user, {
            $push: {
                spells: body
            }
        },
            {
                new: true
            });


        await newSpell.save();
        return newSpell;
    },

    deleteOneSpell: async (user, body) => {

        const userExists = await User.findById(user);
        if (!userExists) {
            throw new Error(`User ${user} not found`);
        }


        const removeSpell = await User.findByIdAndUpdate(user, {
            $pull: {
                spells: { id: body }
            }
        },
            {
                multi: true,
                new: true,
            });

        await removeSpell.save();
        return removeSpell;
    },

    addOneElixir: async (user, body) => {

        const userExists = await User.findById(user);
        if (!userExists) {
            throw new Error(`User ${user} not found`);
        } else if (userExists.elixirs.some((item) => item.id == body.id) === true) {
            throw new Error(`${body.name} already saved!`)
        }


        const newElixir = await User.findByIdAndUpdate(user, {
            $push: {
                elixirs: body
            }
        },
            {
                new: true
            });


        await newElixir.save();
        return newElixir;
    },

    deleteOneElixir: async (user, body) => {

        const userExists = await User.findById(user);
        if (!userExists) {
            throw new Error(`User ${user} not found`);
        }

        const removeElixir = await User.findByIdAndUpdate(user, {
            $pull: {
                elixirs: {id: body}
            }
        },
            {
                multi: true,
                new: true,
            });

        await removeElixir.save();
        return removeElixir;
    }


}; 