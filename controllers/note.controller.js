const noteService = require('../services/note.service');

//POST /note
const addNote = async (req, res, next) => {

    // const userId = req.user.id; //req.user is set by middleware auth.js
    const { title, body, createdAt } = req.body;

    let result = {
        message: null,
        status: null,
        data: null,
    };

    try {
        const data = await noteService.addNote(/* userId, */ title, body, createdAt);
        result.message = "New note added!";
        result.status = 201; // Code for 'Successfully created'
        result.data = data;
    } catch (error) {
        console.error(error); 
        result.message = error.message;
        result.status = 400;
    } finally {
        return res.json(result);
    }

};

//PATCH /note/:id
const editNote = async (req, res, next) => {

    // const userId = req.user.id;
    const noteId = req.params.id;
    const { title, body } = req.body;

    let result = {
        message: null,
        status: null,
        data: null,
    };

    try {
        const data = await noteService.editNote(/* userId, */ noteId, title, body);
        result.message = `Edited note id ${id}`;
        result.status = 200;
        result.data = data;
    } catch (error) {
        console.error(error); 
        result.message = error.message;
        result.status = 400;
    } finally {
        return res.json(result);
    }

};

//DELETE /note/:id
const deleteNote = async (req, res, next) => {

    // const userId = req.user.id;
    const noteId = req.params.id;

    let result = {
        message: null,
        status: null,
        data: null,
    };

    try {
        const data = await noteService.deleteNote(/* userId, */ noteId);
        result.message = `Deleted note id ${id}`;
        result.status = 204;
        result.data = data;
    } catch (error) {
        console.error(error);
        result.message = error.message;
        result.status = 400;
    } finally {
        return res.json(result);
    }

};

//GET /note/:id
const getOneNote = async (req, res, next) => {

    // const userId = req.user.id;
    const noteId = req.params.id;

    let result = {
        message: null,
        status: null,
        data: null,
    };

    try {
        const data = await noteService.getOneNote(/* userId, */ noteId);
        result.message = `Displaying note id ${id}`;
        result.status = 200;
        result.data = data;
    } catch (error) {
        console.error(error);
        result.message = error.message;
        result.status = 400;
    } finally {
        return res.json(result);
    }

};

//GET /note
const getAllNotes = async (req, res, next) => {

    // const userId = req.user.id;

    let result = {
        message: null,
        status: null,
        data: null,
    };

    try {
        const data = await noteService.getAllNotes(/* userId*/);
        result.message = "Displaying all notes";
        result.status = 200;
        result.data = data;
    } catch (error) {
        console.error(error);
        result.message = error.message;
        result.status = 500; // Code for server-side error
    } finally {
        return res.json(result);
    }

};

module.exports = { addNote, editNote, deleteNote, getOneNote, getAllNotes }; 