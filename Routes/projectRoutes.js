const {Router}=require('express')
const { createNote, getOneNote, getAllNotes, updateNote, deleteNote } = require('../controllers/projectController')
const {verifyToken}=require('../Middleware/verifyToken')

const projectRouter=Router()

projectRouter.post('/',verifyToken, createNote)
projectRouter.get('/:id',getOneNote)
projectRouter.get('/',getAllNotes)
projectRouter.put('/:id',updateNote)
projectRouter.delete('/:id',deleteNote)


module.exports={
    projectRouter
}