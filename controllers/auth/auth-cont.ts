// IMPORTING USER MODEL TO CREATE A USER
import userModel from '../../data/models/user'

// IMPORTING OTHER MODULES
import * as mongoose from 'mongoose'
import express from 'express'

import { maxAge, createToken } from '../helper/jwt-handler'
import errorHandler from '../helper/error-handler'

// CREATING A NEW USER
const createUserWithEmailAndPassword = async (req: express.Request, res: express.Response) => {
  const { name, email, password, phoneNumber } = req.body

 try{
   // IF THE USER IS CREATED SUCCESSFULLY CREATE A JWT WITH THEIR ID
  const user = await userModel.create({name, email, password, phoneNumber})
  const token = createToken(user._id)
  res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
  res.json({
    name: user.name, 
    id: user._id,
    email: user.email,
    phoneNumber: user.phoneNumber
  }) 
 }
 catch (err) {
  console.log(err.message)
  let errors = errorHandler(err)
  res.json(errors)
 }
}

// Login a user
const loginUserWithEmailAndPassword = async (req: express.Request, res: express.Response) => {
  
  const { email, password } = req.body // retrieve email and password 

  try {
    const user = await userModel.login(email, password) // login with email and password

    const token = createToken(user._id)       // create a token for that user

    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000}) // create a cookie to hold the jwt

    res.json({name: user.name, id: user._id, email: user.email}) // send some of the user info back

  } 
  catch (err) {
    const errors = errorHandler(err)
    res.status(400).json(errors)
  }
}

const logoutUser = async (req: express.Request, res: express.Response) => {

  if( typeof req.cookies.jwt !== undefined){ // if cookie with the value of jwt exists

    // res.cookie('jwt', '', {maxAge: 1}) // delete the cookie

    res.clearCookie('jwt')

    res.json({message: 'logout successfull'})  // send the user a logout successfull message
  }
  else{
    res.json({message: 'you are not logged in'}) // notify the user that they are not logged in
  }
}

export { 
  createUserWithEmailAndPassword,   // signup function
  loginUserWithEmailAndPassword,    // login function
  logoutUser                       // logout function
}