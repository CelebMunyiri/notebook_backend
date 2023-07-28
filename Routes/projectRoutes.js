const {Router}=require('express')
const { createNote } = require('../controllers/projectController')

const projectRouter=Router()

projectRouter.post('/',createNote)


module.exports={
    projectRouter
}