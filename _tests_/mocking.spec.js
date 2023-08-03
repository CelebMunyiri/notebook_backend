const crypto=require('crypto')
const {generateBytes}=require('../controllers/authController')
const { JsonWebTokenError } = require('jsonwebtoken')
JsonWebTokenError.
test("Generate Bytes",async()=>{
    jest.mock('crypto')
   crypto.randomBytes.mockResolvedValueOnce(fghjjahfshad)
   const res=await generateBytes()
   console.log(res)
   // await generateBytes
})