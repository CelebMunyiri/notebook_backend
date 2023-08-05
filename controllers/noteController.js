const {v4}=require('uuid')
const mssql=require('mssql');

const { sqlConfig } = require('../config/config');

const createNote=async(req,res)=>{
    try {
        const id=v4()

        const {note_title,note_content}=req.body
const pool=await mssql.connect(sqlConfig)
const result=(await pool.request()
    .input('id',id)
    .input('note_title',note_title)
    .input('note_content',note_content)
   // .input('creation_time',creation_time)
    .execute('createNoteProc'))
   
    if(result.rowsAffected == 1){
     res.json({
            message: "New Note Created as success" })  
        }else{
            return res.json({message: "Note Creation Failed"})
        }   
        
  }  catch (error) {
  return res.json({error:`${error.message}`})      
    }
}

const updateNote=async(req,res)=>{
    try {
        const {id}=req.params

        const {note_title,note_content}=req.body
     const pool=await   mssql.connect(sqlConfig)
    
       const result=(await  pool.request()
            .input('id',id)
            .input('note_title',note_title)
            .input('note_content',note_content)
            .execute('updateNoteProc')) 
            if(result.rowsAffected == 1){
                res.status(200).json({
                    message: 'Note Update Success'
                })
            }else{
                res.status(400).json({
                    message: 'Note Update Failure'
                })
            }
            
    } catch (error) {
        res.json({Error:error.message})
    }
}

const getOneNote=async(req,res)=>{
    try {
        const {id}=req.params
        
      const pool=await mssql.connect(sqlConfig)
        
         const note=(await pool.request()
            .input('id',id)
            .execute('getOneNoteProc')).recordset 

            return res.status(200).json({note:note})
            
    } catch (error) {
        res.json({Error:error})
    }
}

const getAllNotes=async(req,res)=>{
    try {
    const pool=await mssql.connect(sqlConfig)
    const notes=(await pool.request()
        .execute('getAllNotesProc')).recordset 
        return res.status(200).json({notes:notes})
     
    } catch (error) {
        return res.json({Error:error})
    }
}

const deleteNote=async(req,res)=>{
    try {
        const {id}=req.params
        
    const pool=await mssql.connect(sqlConfig)
        const result=(await pool.request()
            .input('id',id)
            .execute('deleteNoteProc'))
            if(result.rowsAffected==1){
                return res.status(200).json({message:"Note Deleted Success"})
            }else{
                return res.status(401).json({message:"Error Deleting Note"})
            }
           
       
    } catch (error) {
        res.json({Error:error})
    }
}
module.exports={
    createNote,
    updateNote,
    getOneNote,
    getAllNotes,
    deleteNote
}
