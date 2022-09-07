const userService = require('../services/user.service');
const { registerOneUser } = require("../services/user.service");


//POST /note
const registerUser = async (req, res) => {

    // const userId = req.user.id; //req.user is set by middleware auth.js
    const { username, email, password } = req.body;

    let result = {
        message: null,
        status: null,
        data: null,
    };

    try {
        const data = await registerOneUser(username, email, password);
        result.message = `New user ${username}  added!`;
        result.status = 201; // Code for 'Successfully created'
        result.data = data;
    } catch(error) {
        console.error(error); 
            result.message = error.message;
            result.status = 400;
    } finally {
        return res.json(result);
    }
    }


    const loginUser = async(req, res) => {
        const {email, password} = req.body;
        
        let result = {
            message: null,
            status: null,
            data: null,
        };

        try {
            const data = await userService.loginOneUser(email, password);
            result.message = `user ${email} logged in!`;
            result.status = 201;
            result.data = data
        } catch (error) {
            console.error(error); 
            result.message = error.message;
            result.status = 400;
        } finally {
            return res.json(result);
        }

    }




//PATCH /note/:id
const getProfile = async (req, res) => {

    // const userId = req.user.id;
    const userId = req.user.id;

    let result = {
        message: null,
        status: null,
        data: null,
    };

    try {
        const data = await userService.getUserProfile(userId);
        result.message = `User details retrieved!`;
        result.status = 200;
        result.data = data;
    } catch (error) {
        console.error(error); 
        result.message = error.message;
        result.status = 400;
    } finally {
        return res.json(result);
    }

};

//DELETE /note/:id
const updateProfile = async (req, res) => {

    // const userId = req.user.id;
    const userId = req.user.id;
    const body = req.body;

    let result = {
        message: null,
        status: null,
        data: null,
    };

    try {
        const data = await userService.updateUserProfile(userId, body);
        result.message = `Profile details updated!`;
        result.status = 200;
        result.data = data;
    } catch (error) {
        console.error(error);
        result.message = error.message;
        result.status = 400;
    } finally {
        return res.json(result);
    }

};

//GET /note/:id
const logoutUser = async (req, res) => {

    // const userId = req.user.id;
    const userId = req.user.id;

    let result = {
        message: null,
        status: null,
        data: null,
    };

    try {
        const data = await userService.logoutOneUser(/* userId, */ userId);
        result.message = `Successfully logged out ${userId}`;
        result.status = 200;
        result.data = data;
    } catch (error) {
        console.error(error);
        result.message = error.message;
        result.status = 404; // Code for 'Not found'
    } finally {
        return res.json(result);
    }

};

module.exports = { registerUser, loginUser, getProfile, updateProfile, logoutUser }; 