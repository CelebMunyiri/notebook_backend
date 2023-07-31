const {Router}=require('express')
const { registerUser, userLogin } = require('../controllers/authController')

userRouter=Router()

userRouter.post('/register',registerUser)
userRouter.post('/login',userLogin)

module.exports={
    userRouter
}