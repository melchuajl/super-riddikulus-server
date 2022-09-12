const Note = require('../models/note.model');

module.exports = {

    addNote: async (userId, title, body, createdAt) => {

        const newNote = await Note.create({ 
            userId,
            title,
            body,
            createdAt
        });

        return newNote.save();
    },

    editNote: async (/* userId,  */noteId, title, body) => { // Note.findOneAndUpdate

        const noteToEdit = await Note.findById(noteId);

        if (!noteToEdit) {
            throw new Error(`Note ID ${noteId} does not exist`)
        }

        if (title) noteToEdit.title = title;
        if (body) noteToEdit.body = body;

        await noteToEdit.save();
        return noteToEdit;

    },

    deleteNote: async (/* userId,  */noteId) => { // Note.deleteOne

        const noteToDelete = await Note.findById(noteId);

        if (!noteToDelete) {
            throw new Error(`Note ID ${noteId} does not exist`)
        }

        await noteToDelete.deleteOne();
        return noteToDelete;

    },

    getOneNote: async (/* userId,  */noteId) => {
        const note = await Note.findById(noteId);
        return note;
    },

    getAllNotes: async (userId) => {
        const notes = await Note.find({ userId: userId });
        return notes;
    }

}; 