const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema(
    {
        //_id of type ObjectId is automatically generated by Mongoose
        userId: {
            type: String,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            require: true, 
            default: "Default title"
        },
        body: {
            type: String,
            require: true, 
            default: "This is a default note body"
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Note', NoteSchema);