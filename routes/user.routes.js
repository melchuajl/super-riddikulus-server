const express = require('express');
const router = express.Router();

const { registerUser, loginUser, logoutUser, getProfile, updateProfile, addSpell, deleteSpell, addElixir, deleteElixir, updatePassword } = require('../controllers/user.controller');


const { isLoggedIn } = require('../middleware/auth');

//Add new user
router.post('/user', registerUser);

//login
router.post('/user/login', loginUser);

//logout
router.delete('/user/logout', isLoggedIn,  logoutUser);

//edit Password
router.route('/user/password').put(updatePassword);


//Retrieve and/or edit profile
router.route('/user/profile').get(isLoggedIn, getProfile).put(/* isLoggedIn, */ updateProfile);

// Retrieve / Add / Delete  savedSpells for user
router.route('/spells')/* .get(isLoggedIn, getSpells) */.put(/* isLoggedIn, */ addSpell).delete(/* isLoggedIn */ deleteSpell);

// Retrieve / Add / Delete  savedElixirs for user
router.route('/elixirs')/* .get(isLoggedIn, getSpells) */.put(/* isLoggedIn, */ addElixir).delete(/* isLoggedIn */ deleteElixir);

module.exports = router; 