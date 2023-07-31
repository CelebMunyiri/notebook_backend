const {Router}=require('express')
const { registerUser, userLogin } = require('../controllers/authController')

userRouter=Router()

userRouter.post('/',registerUser)
userRouter.post('/login',userLogin)

module.exports={
    userRouter
}