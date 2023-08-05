const joi=require('joi')

const userLoginSchema=joi.object({
    username:joi.string().required().min(5).max(20).messages({
        'username.empty':'Please Input Your userName with length 5 to 20'
    }),
    password:joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})

const userRegisterSchema=joi.object({
    username:joi.string().required().min(5).max(20).messages({
        'username.empty':'Please Input Your userName with length 5 to 20'
    }),
    email:joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password:joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
})

module.exports={
    userLoginSchema,
    userRegisterSchema
}
