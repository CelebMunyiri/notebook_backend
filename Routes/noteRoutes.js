const { Router } = require("express");
const {
  createNote,
  getOneNote,
  getAllNotes,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");
const { verifyingToken } = require("../Middleware/verifyToken");

const projectRouter = Router();

projectRouter.post("/", verifyingToken, createNote);
projectRouter.get("/:id",verifyingToken, getOneNote);
projectRouter.get("/",verifyingToken, getAllNotes);
projectRouter.put("/:id",verifyingToken, updateNote);
projectRouter.delete("/:id",verifyingToken, deleteNote);

module.exports = {
  projectRouter,
};
