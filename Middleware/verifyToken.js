const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()

const verifyingToken=async(req,res,next)=>{
    try {
        const token=request.headers['token']
        if(!token){
          return  res.status(401).json({
                message:'Restricted Access, please provide a token'
            })
        }
        const decodedData=jwt.verify(token,process.env.SECRET)
        req.info=decodedData
        
    } catch (error) {
        return res.status(401).json({
            message:'not understood'
        })
    }
    next()
}

module.exports={
    verifyingToken,
}