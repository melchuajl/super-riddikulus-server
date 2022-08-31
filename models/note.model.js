const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema(
    {
        //_id of type ObjectId is automatically generated by Mongoose
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        title: {
            type: String,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date()
        },
        updatedAt: {
            type: Date,
            default: Date()
        }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Note', NoteSchema);