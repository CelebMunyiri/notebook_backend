const {v4}=require('uuid')
const mssql=require('mssql')
//const notes=[] for test using noDB

const createNote=async(req,res)=>{
    try {
        const id=v4()
        const creation_time=Date.now();

        const {note_title,note_content}=req.body
const newNote={id,note_title,note_content,creation_time}

//notes.push(newNote)

res.json({
    message:'Note Created succesfully',
    note:newNote
})
    } catch (error) {
  return res.json({error})      
    }
}

module.exports={
    createNote
}