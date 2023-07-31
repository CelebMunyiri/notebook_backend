const mssql=require('mssql')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {v4}=require('uuid')
const { createUserTable } = require('../Database/Tables/userTable')
const { sqlConfig } = require('../config/config');


const registerUser=async(req,res)=>{
    try {
        createUserTable()
const id=v4()

const {username,email,password}=req.body

const hashedPassword=await bcrypt.hash(password,5)

mssql.connect(sqlConfig)
.then((pool)=>{
    pool.request()
    .input('id',id)
    .input('username',username)
    .input('email',email)
    .input('password',hashedPassword)
    
    .execute('registerUserProc')
}).then((result)=>{
    res.json({message:"User Registered a success"})
    
}).catch((err)=>{
    console.log(`Error, ${err.message}`)
})
        
    } catch (error) {
        
        res.json({Error:error.message})
    }
}

const userLogin=async(req,res)=>{
    try {
        const {username,password}=req.body

        mssql.connect(sqlConfig)
        .then((pool)=>{
            pool.request()

            .input('username',username)
            .input('password',password)
            .execute('loginUserProc')
        })
        .then((result)=>{
            res.status(200).json({message:'Login Succesful'})
        }).catch((err)=>{
            console.log(`Error Occured, ${err.message}`)
        })
    } catch (error) {
        res.json({Error:error.message})
    }
}
module.exports={
    registerUser,
    userLogin
}