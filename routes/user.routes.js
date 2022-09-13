const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logoutUser, getProfile, updateProfile } = require('../controllers/user.controller');


const { isLoggedIn } = require('../middleware/auth');

//Add new user
router.post('/user', registerUser);

//login
router.post('/user/login', loginUser);

//logout
router.delete('/user/logout', isLoggedIn,  logoutUser);

//Retrieve and/or edit profile
router.route('/user/profile').get(isLoggedIn, getProfile).put(isLoggedIn, updateProfile);

module.exports = router; 