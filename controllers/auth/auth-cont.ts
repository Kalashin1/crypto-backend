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
  
  const { email, password } = req.body

  try {
    const user = await userModel.login(email, password)
    const token = createToken(user._id)
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000})
    res.json({name: user.name, id: user._id, email: user.email})
  } catch (err) {
    const errors = errorHandler(err)
    res.status(400).json(errors)
  }
}

export { 
  createUserWithEmailAndPassword,
  loginUserWithEmailAndPassword 
}