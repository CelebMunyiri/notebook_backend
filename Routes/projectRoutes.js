const {Router}=require('express')
const { createNote, getOneNote, getAllNotes, updateNote, deleteNote } = require('../controllers/projectController')

const projectRouter=Router()

projectRouter.post('/',createNote)
projectRouter.get('/:id',getOneNote)
projectRouter.get('/',getAllNotes)
projectRouter.put('/:id',updateNote)
projectRouter.delete('/:id',deleteNote)


module.exports={
    projectRouter
}