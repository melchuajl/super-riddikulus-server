const jwt = require('jsonwebtoken');
require('dotenv').config();
const privateKey = process.env.TOKEN_KEY;
const User = require("../models/user.model")

module.exports = {

    isLoggedIn: async (req, res, next) => {

        const authHeader = req.headers.authorization;

        let token;

        if (
            authHeader && authHeader.startsWith("Bearer")
        ) {
            //token from header
            try {
                token = authHeader.split(" ")[1];
            
            //verify token
            const decoded = jwt.verify(token, privateKey);
            
            //Get user from token
            req.user = await User.findById(decoded.id).select("-password");

            next();
        } catch (error) {
            res.status(401);
            console.error("not authorized");
        }
    }

    if (!token) {
        res.status(401); // Code meaning 'Authentication required'
        return res.json({ message: "Please log in" });
    }
}
}
