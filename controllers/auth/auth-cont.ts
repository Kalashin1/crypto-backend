// IMPORTING USER MODEL TO CREATE A USER
import userModel from '../../data/models/user'

// import the userInterface, allows us to type to a user
import { userInterface } from '../helper/interface'

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

  
  // CREATE A COOKIE TO HOLD THE JWT
  const token = createToken(user._id)

  // send the cookie back to the user agent
  res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000}) // in production add secure:true
  
  // send some user data
  res.json({
    name: user.name, // Lastly we send back a json with the user details
    id: user._id,
    email: user.email,
    phoneNumber: user.phoneNumber
  }) 
 }
 catch (err) {
  // console.log(err.message) // handles the error if ther is an error
  let errors = errorHandler(err) // send back the handled error to the frontend
  res.json(errors)
 }
}

<<<<<<< HEAD
const loginUserWithEmailAndPassword = async (req: express.Request, res: express.Response) => {

  const { email, password } = req.body

  try{
    const user = await userModel.login(email, password) // Login the user

    const token = createToken(user._id) // create a token with their id

    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000}) // send a cookie that holds the jwt, add secure:true for production
    
    res.json({name: user.name, id: user._id, email: user.email}) // send back some user info to frontend
  }
  catch (err) {
    // console.log(err.message) // handles the error if ther is an error
    let errors = errorHandler(err) // send back the handled error to the frontend
    res.json(errors)
  }
}

const logoutUser = (req: express.Request, res: express.Response) => {
  console.log(req.cookies)
  if(req.cookies.jwt){ // if a cookie for a user exists, 
    res.cookie('jwt', '', {maxAge: 1}) // delete the cookie 
    res.json({message: 'logout successfull'}) // notify the frontend
  }
  else{
    res.json({message: 'you are not logged in'}) // they are not logged in
=======
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
>>>>>>> logout
  }
}

export { 
<<<<<<< HEAD
  createUserWithEmailAndPassword,  // signup function
  loginUserWithEmailAndPassword,  // login function
  logoutUser                     // logout function
=======
  createUserWithEmailAndPassword,   // signup function
  loginUserWithEmailAndPassword,    // login function
  logoutUser                       // logout function
>>>>>>> logout
}