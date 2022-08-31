const Note = require('../models/note.model');

module.exports = {

    newNote: async (title, body) => {

        const note = await Note.create({
            title: title,
            body: body,
            createdAt: Date()
        });

        return note.save();
    },

    editNote: async () => {


    },

    deleteNote: async () => {


    },

    getOneNote: async () => {


    },

    getAllNotes: async () => {

        
    }

}; 