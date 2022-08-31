require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.get('/', (req, res) => {
    res.send(`WELCOME ONE AND ALL \n pew pew pew`)
}); 

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

/* //Import models
const User = require('./models/user.model'); 
const Note = require('./models/note.model'); 

//Import routes
const app = require('./routes/note.routes') */

//Connect to mongoDB server
mongoose.connect("mongodb+srv://super-riddikulus:SDIC5GROUP1@cluster0.6myv6ok.mongodb.net/?retryWrites=true&w=majority");
const db = mongoose.connection
db.once('Success', () => {
    console.log('Connected to mongoDB!')
});
db.on('Error', (error) => {
    console.log('Error', error)
}); 