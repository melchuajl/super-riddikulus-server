const noteService = require('../services/note.service');

//POST /note
const newNote = async (req, res, next) => {

    const { title, body, createdAt } = req.body;

    let result = {
        message: null,
        status: null,
        data: null,
    };

    if (!title || !body || !createdAt ) {
        res.status(400);
        return res.json({ message: "Incomplete input fields" })
    }

    try {
        const data = await noteService.newNote(title, body, createdAt);
        result.message = "New note added!";
        result.status = 201; // status code for 'Created'
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

    const id = req.params.id;
    const { title, body } = req.body;

    let result = {
        message: null,
        status: null,
        data: null,
    };

    try {
        const data = await noteService.editNote(id, title, body);
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

    const id = req.params.id;

    let result = {
        message: null,
        status: null,
        data: null,
    };

    try {
        const data = await noteService.deleteNote(id);
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

    const id = req.params.id;

    let result = {
        message: null,
        status: null,
        data: null,
    };

    try {
        const data = await noteService.getOneNote(id);
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

    let result = {
        message: null,
        status: null,
        data: null,
    };

    try {
        const data = await noteService.getAllNotes();
        result.message = "Displaying all notes";
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

module.exports = { newNote, editNote, deleteNote, getOneNote, getAllNotes }; 