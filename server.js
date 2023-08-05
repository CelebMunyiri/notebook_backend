const express=require('express')
const { projectRouter } = require('./Routes/noteRoutes');
const { userRouter } = require('./Routes/userRoutes');
const app=express();
app.use(express.json())
app.use('/notes',projectRouter)
app.use('/user',userRouter)
app.use((err,req,res,next)=>{
    res.json({Error:err})
})
app.listen(4600,()=>{
    console.log('server Running on port 4600')
})