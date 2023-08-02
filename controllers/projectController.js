const {v4}=require('uuid')
const mssql=require('mssql');

const { sqlConfig } = require('../config/config');

const createNote=async(req,res)=>{
    try {
        const id=v4()

        const {note_title,note_content}=req.body
mssql.connect(sqlConfig)
.then((pool)=>{
    pool.request()
    .input('id',id)
    .input('note_title',note_title)
    .input('note_content',note_content)
   // .input('creation_time',creation_time)
    .execute('createNoteProc')
    .then((respons)=>{
        return res.json({
            message:'New Note Created as success',
        
        })
        
        })
        .catch((err)=>{
            res.json({
                error:err.message
            })
    })

})
  }  catch (error) {
  return res.json({error:`${error.message}`})      
    }
}

const updateNote=async(req,res)=>{
    try {
        const {id}=req.params

        const {note_title,note_content}=req.body
        mssql.connect(sqlConfig)
        .then((pool)=>{
            pool.request()
            .input('id',id)
            .input('note_title',note_title)
            .input('note_content',note_content)
            .execute('updateNoteProc')
            .then((result)=>{
                return res.json({
                    message:'Project Updated Successfully'
                })
                
            })
        }).catch((error)=>{
            res.json({Error:`You have an error ${error}`})
        })
        
    } catch (error) {
        res.json({Error:error.message})
    }
}

const getOneNote=async(req,res)=>{
    try {
        const {id}=req.params
        
        mssql.connect(sqlConfig)
        .then((pool)=>{
            pool.request()
            .input('id',id)
            .execute('getOneNoteProc')
            .then((result)=>{
               res.json({
                    message:'Here is the One Note',
                    note: result.recordset
                })
                
            }).catch((error)=>{
                res.status(404).json({Error:`You have an error ${error}`})
            })
        })
    } catch (error) {
        res.json({Error:error})
    }
}

const getAllNotes=async(req,res)=>{
    try {
        mssql.connect(sqlConfig)
    .then((pool)=>{
        pool.request()
        .execute('getAllNotesProc')
        .then((result)=>{
            res.json({message:'Here are all the notes',
        allNotes:result.recordset})
        })
    }).catch((error)=>{
        res.json({Error:`You have an error ${error}`})
    })
    } catch (error) {
        return res.json({Error:error})
    }
}

const deleteNote=async(req,res)=>{
    try {
        const {id}=req.params
        
        mssql.connect(sqlConfig)
        .then((pool)=>{
            pool.request()
            .input('id',id)
            .execute('deleteNoteProc')
            .then((result)=>{
                res.json({message:'Note deleted Succesfully'})
            })
        }).catch((error)=>{
            return res.json({Error:error})
        })
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
