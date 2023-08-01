const mssql=require('mssql')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const {v4}=require('uuid')
const dotenv=require('dotenv')
dotenv.config()
const { createUserTable } = require('../Database/Tables/userTable')
const { sqlConfig } = require('../config/config');



const registerUser=async(req,res)=>{
    try {
        createUserTable()
const id=v4()

const {username,email,password}=req.body
const salt = await bcrypt.genSalt(10)
const hashedPassword=await bcrypt.hash(password, salt)
console.log(hashedPassword);
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
        const pool=await mssql.connect(sqlConfig)
      const user= (await pool.request().input('username',mssql.VarChar,username).execute('loginUserProc')).recordset[0]
    
      const hashedPassword=user.password
      

      if (user){
        const comparePwd=await bcrypt.compare(password, hashedPassword)
       

        if(comparePwd){
            const {password,...payload}=user
            const token=jwt.sign(payload, process.env.SECRET,{expiresIn:'36000s'})
            return res.status(200).json({
                message:'Logged in', token })
        }else{
            return res.status(400).json({
                message:'Invalid Login Credential'
            })
        }
      }else{
        return res.status(400).json({
            message:'User NOt Found'

        })
      }
    } catch (error) {
        res.json({Error:error.message})
    }
}


module.exports={
    registerUser,
    userLogin
}
