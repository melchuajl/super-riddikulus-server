const express = require('express');
const router = express.Router();

const { newNote, editNote, deleteNote, getAllNotes } = require('../controllers/note.controller');
const auth = require('../middleware/auth');

//Create new note
router.post('/note/new', auth, newNote)

//Edit note
router.put('/note/edit', auth, editNote)

//Delete note
router.delete('/note/:id', auth, deleteNote)

//Fetch all notes
router.get('/note', auth, getAllNotes)

module.exports = router; 