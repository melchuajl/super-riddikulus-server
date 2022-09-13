const express = require('express');
const app = express();
app.use(express.json()); 

//IMPORT ROUTES
const noteRoutes = require('./note.routes'); 
const userRoutes = require('./user.routes');


//CONFIGURE ROUTES
app.use(noteRoutes);
app.use(userRoutes);

// ADDING CORS (Cross-Origin Resource Sharing)
const cors = require('cors');
app.use(cors());

module.exports = app; 