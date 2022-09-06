const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logoutUser, getProfile, updateProfile } = require('../controllers/user.controller');


const { isLoggedIn } = require('../middleware/auth');

//Add new user
router.post('/user', /* isLoggedIn,  */ registerUser);

//Edit note
router.post('/user/login', /* isLoggedIn,  */ loginUser);

//Delete note
router.delete('/user/logout', /* isLoggedIn,  */ logoutUser);

//Fetch all notes
router.route('/user/profile').get(/* isLoggedIn, */ getProfile).put(/* isLoggedIn, */ updateProfile);

module.exports = router; 