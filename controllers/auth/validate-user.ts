import jwt from 'jsonwebtoken'

import express from 'express'

import userModel from '../../data/models/user';


const validateUser = (req: express.Request, res: express.Response, next: Function) => {
  const token:string = req.cookies.jwt
  if(token){
    jwt.verify(token, 'my secrete key', (err: Error, decodedToken: any) => {
      if(err){
        // console.log(err.message)
        res.status(400).json(err.message)
      }
      else{
        // console.log(decodedToken)
        next()
      }
    })
  }
  else{
    // console.log('no cookie')
    res.status(400).json('you are not logged')
  }
}