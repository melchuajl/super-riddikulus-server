const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logoutUser, getProfile, updateProfile, addSpell } = require('../controllers/user.controller');


const { isLoggedIn } = require('../middleware/auth');

//Get all user
/* router.get('/user', viewAllUser); */

//Add new user
router.post('/user', registerUser);

//login
router.post('/user/login', loginUser);

//logout
router.delete('/user/logout', isLoggedIn,  logoutUser);

//Retrieve and/or edit profile
router.route('/user/profile').get(isLoggedIn, getProfile).put(isLoggedIn, updateProfile);

// Retrieve / Add / Delete  savedSpells for user
router.route('/spells')/* .get(isLoggedIn, getSpells) */.put(/* isLoggedIn, */ addSpell)/* .delete(isLoggedIn, deleteSpell) */;

module.exports = router; 