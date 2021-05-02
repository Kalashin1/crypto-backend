// IMPORTING USER MODEL TO CREATE A USER
import userModel from '../../data/models/user'
import { web3 } from '../helper/web3Helper'

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

  const ethWallet = web3.eth.accounts.decrypt(user.wallet.eth, password)

  const address = web3.eth.Iban.toIban(ethWallet.address)

  let balance = await web3.eth.getBalance(address)

  ethWallet.balance = web3.utils.fromWei(balance, 'ether')
  
  // send some user data

  res.json({
    name: user.name, // Lastly we send back a json with the user details
    id: user._id,
    email: user.email,
    phoneNumber: user.phoneNumber,
    wallet: { ethWallet }
  }) 
 }
 catch (err) {
  console.log(err) // handles the error if ther is an error
  let errors = errorHandler(err) // send back the handled error to the frontend
  res.json(errors)
 }
}

// Login a user
const loginUserWithEmailAndPassword = async (req: express.Request, res: express.Response) => {
  
  const { email, password } = req.body // retrieve email and password 

  try {

    const user  = await userModel.login(email, password) // login with email and password

    const token = createToken(user._id)       // create a token for that user

    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000}) // create a cookie to hold the jwt

    const eth = user.wallet.eth

    const address = web3.eth.Iban.toIban(eth.address)

    let balance = await web3.eth.getBalance(address)
    
    eth.balance = web3.utils.fromWei(balance, 'ether')

    console.log(balance)

    res.json({name: user.name, id: user._id, email: user.email, wallet: { eth } }) // send some of the user info back
  

  } 
  catch (err) {
    console.log(err)
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
  createUserWithEmailAndPassword,  // signup function
  loginUserWithEmailAndPassword,  // login function
  logoutUser                     // logout function
}