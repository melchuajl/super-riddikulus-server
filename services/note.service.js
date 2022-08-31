const Note = require('../models/note.model');

module.exports = {

    addNote: async (userId, title, body, createdAt) => {

        const newNote = await Note.create({ //should this be InsertOne? 
            userId,
            title,
            body,
            createdAt
        });

        return newNote.save();
    },

    editNote: async (userId, noteId, title, body) => {


    },

    deleteNote: async (userId, noteId) => {


    },

    getOneNote: async (userId, noteId) => {


    },

    getAllNotes: async (userId) => {
        const notes = await Note.find({ userId: userId });
        return notes;
    }

}; 