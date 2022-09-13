const userService = require('../services/user.service');
const { registerOneUser, addOneSpell, deleteOneSpell, addOneElixir, deleteOneElixir } = require("../services/user.service");


//POST /user
const registerUser = async (req, res) => {

    // const userId = req.user.id; //req.user is set by middleware auth.js
    const { username, email, password, gender} = req.body;

    let result = {
        message: null,
        status: null,
        data: null,
    };

    try {
        const data = await registerOneUser(username, email, password, gender);
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

//POST /user/login
    const loginUser = async(req, res) => {
        const {email, password} = req.body;
        
        let result = {
            message: null,
            status: null,
            data: {
                token: null,
                email: null,
                name: null,
                gender: null,
                id: null,
            },
        };

        try {
            const data = await userService.loginOneUser(email, password);
            result.message = `user ${email} logged in!`;
            result.status = 201;
            result.data = data;
        } catch (error) {
            console.error(error); 
            result.message = error.message;
            result.status = 400;
        } finally {
            return res.json(result);
        }

    }




//get /user/profile
const getProfile = async (req, res) => {


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

//PUT user/profile
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

//POST /user/logout
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

//PUT /spells
const addSpell = async(req, res) => {
    const {user, body} = req.body;
    let result = {
        message: null,
        status: null,
        data: null,
    };

    try {
        const data = await addOneSpell(user, body);
        result.message = `${body} saved!`;
        result.status = 201;
        result.data = data;
        console.log(body)
    } catch (error) {
        console.error(error); 
        result.message = error.message;
        result.status = 400;
    } finally {
        return res.json(result);
    }

};

//DEL /spells

const deleteSpell = async(req, res) => {
    const {user, body} = req.body;
    let result = {
        message: null,
        status: null,
        data: null,
    };

    try {
        const data = await deleteOneSpell(user, body);
        result.message = `Spell id ${body} deleted!`;
        result.status = 201;
        result.data = data;
        console.log(body)
    } catch (error) {
        console.error(error); 
        result.message = error.message;
        result.status = 400;
    } finally {
        return res.json(result);
    }

}

//POST /elixirs
const addElixir = async(req, res) => {
    const {user, body} = req.body;
    let result = {
        message: null,
        status: null,
        data: null,
    };

    try {
        const data = await addOneElixir(user, body);
        result.message = `${body} saved!`;
        result.status = 201;
        result.data = data;
        console.log(body)
    } catch (error) {
        console.error(error); 
        result.message = error.message;
        result.status = 400;
    } finally {
        return res.json(result);
    }

};


//DEL / elixirs
const deleteElixir = async(req, res) => {
    const {user, body} = req.body;
    let result = {
        message: null,
        status: null,
        data: null,
    };

    try {
        const data = await deleteOneElixir(user, body);
        result.message = `Elixir id ${body} deleted!`;
        result.status = 201;
        result.data = data;
        console.log(body)
    } catch (error) {
        console.error(error); 
        result.message = error.message;
        result.status = 400;
    } finally {
        return res.json(result);
    }

}

module.exports = { registerUser, loginUser, getProfile, updateProfile, logoutUser, addSpell, deleteSpell, addElixir, deleteElixir }; 