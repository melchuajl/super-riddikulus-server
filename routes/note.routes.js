const express = require('express');
const router = express.Router();

const { addNote, editNote, deleteNote, getOneNote, getAllNotes } = require('../controllers/note.controller');
const { isLoggedIn } = require('../middleware/auth');

//Add new note
router.post('/note', isLoggedIn, addNote)

//Edit note
router.patch('/note/:id', isLoggedIn, editNote)

//Delete note
router.delete('/note/:id', isLoggedIn, deleteNote)

//Fetch one note
router.get('/note/:id', isLoggedIn, getOneNote)

//Fetch all notes
router.get('/note', isLoggedIn, getAllNotes)

module.exports = router; 