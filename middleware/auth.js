const jwt = require('jsonwebtoken');
require('dotenv').config();
const privateKey = process.env.TOKEN_KEY;

module.exports = {

    isLoggedIn: async (req, res, next) => {

        const authHeader = req.headers['authorization'];
        const token = authHeader.split(' ')[1];

        if (!token) {
            res.status(401); // Code meaning 'Authentication required'
            return res.json({ message: "Please log in" });
        }

        jwt.verify(token, privateKey, (error, user) => {
            if (error) {
                res.status(401);
                return res.json({ message: "Invalid token, please log in again" });
            }
            req.user = user;
            return next();
        })
    }

}