require('dotenv').config();
const mongoose = require("mongoose");

//Import models
const User = require('./models/user.model'); 
const Note = require('./models/note.model'); 

//Import routes
const app = require('./routes')

//Connect to mongoDB server
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection; 
db.once('open', () => console.log('Connected to database!'));
db.on('error', (error) => console.error(error));

//Test to check connection
app.get('/', (req, res) => {
    res.send(`WELCOME ONE AND ALL \n pew pew pew`)
});

const PORT = process.env.PORT || 3008;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
