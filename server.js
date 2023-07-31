const express=require('express')
const { projectRouter } = require('./Routes/projectRoutes');
const { userRouter } = require('./Routes/userRoutes');
const app=express();
app.use(express.json())
app.use('/projects',projectRouter)
app.use('/register',userRouter)
app.use((err,req,res,next)=>{
    res.json({Error:err})
})
app.listen(4700,()=>{
    console.log('server Running on port 4700')
})