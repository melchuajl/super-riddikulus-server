const Note = require('../models/note.model');

module.exports = {

    addNote: async (userId, title, body, createdAt) => {

        const newNote = await Note.create({ //should this be Note.insertOne? 
            userId, 
            title,
            body,
            createdAt
        });

        return newNote.save();
    },

    editNote: async (userId, noteId, title, body) => { // Note.findOneAndUpdate


    },

    deleteNote: async (userId, noteId) => { // Note.deleteOne


    },

    getOneNote: async (userId, noteId) => { // Note.findOne().where()


    },

    getAllNotes: async () => {
        const notes = await Note.find();
        return notes;
    }

}; 