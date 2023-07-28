const {v4}=require('uuid')
const mssql=require('mssql');
const { createNotesTable } = require('../Database/Tables/notesTable');
const { sqlConfig } = require('../config/config');
//const notes=[] for test using noDB

const createNote=async(req,res)=>{
    try {
        const id=v4()
        const creation_time=Date.now();

        const {note_title,note_content}=req.body
const newNote={id,note_title,note_content,creation_time}

const pool=await mssql.connect(sqlConfig)
    if(pool.connected){
res.json({
 const result= await pool.request()
        .input('id',mssql.VarChar,id)
        .input('note_title', mssql.VarChar,note_title)
        .input('note_content',mssql.VarChar,note_content)
        .input('creation_time',mssql.Time,creation_time)
        

        //.query(`INSERT INTO projectsTable (id,project_name,description,project_location,startdate,enddate) VALUES (${id},${note_title},${note_content},${creation_time})`)//notes.push(newNote)
.execute('createProjectPROC')


if(result.rowsAffected == 1){
res.json({
    message:'Note Created succesfully',
    note:newNote
})
})
}else{
    return res.json({message:'creation had isue'})
}    
    }
    
    catch (error) {
  return res.json({error})      
    }
}

module.exports={
    createNote
}