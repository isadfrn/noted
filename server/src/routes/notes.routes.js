const { Router } = require("express");
const NotesController = require("../controllers/NotesController");

const notesRoutes = Router();
const notesController = new NotesController();

notesRoutes.post("/:id", notesController.create);

module.exports = notesRoutes;
