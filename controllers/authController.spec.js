

import bcrypt from 'bcrypt'
import { JsonWebTokenError } from 'jsonwebtoken'
import mssql from 'mssql'

const req={
    body:{
        username:"Gift Mwasighe",
        email:"gift@yopmail.com",
        password:"12345678"
    }
}

const res={
    status:jest.fn().mockReturnThis(),
    json:jest.fn().mockReturnThis()
   
}

describe('register an employee',()=>{
    it('should Register a new employee successfully,',async()=>{
jest.spyOn(bcrypt,'hash').mockResolvedValueOnce("kkhhgsgf")
  
const mockedInput=jest.fn().mockReturnThis()

const mockedExecute=jest.fn().mockReturnThis()

})
})