const express = require('express');
const app = express();
app.use(express.json()); 

//IMPORT ROUTES
const noteRoutes = require('./note.routes'); 

//CONFIGURE ROUTES
app.use(noteRoutes);

module.exports = app; 