import * as express from 'express'
import { Router } from 'express'


// OUR CUSTOM HANDLERS WILL BE IMPORTED HERE
import {
  createUserWithEmailAndPassword,
  loginUserWithEmailAndPassword,
  logoutUser
 } from '../controllers/auth/auth-cont'

import { createOffer, editProfile } from '../controllers/user/user'

 // validating and obtaining user modules
 import { validateUser } from '../controllers/auth/validate-user'

const router = Router();


// AUTH ROUTES

// SIGUP ROUTE AND HANDLER FUNCTION
router.post('/signup', async (req, res) => {
  await createUserWithEmailAndPassword(req, res)
})

// signup page
router.get('/signup', (req: express.Request, res: express.Response) => {
  res.render('signup')
})

// login route and handler function
router.post('/login', async (req, res) => {
  await loginUserWithEmailAndPassword(req, res)
})

// login page
router.get('/login', (req: express.Request, res: express.Response) => {
  res.render('login')
})

//logout route and handler function
router.get('/logout', logoutUser)

router.get('/', (req: express.Request, res: express.Response) => {
  console.log('connected')
  res.render('index',{ message: 'connected' })
})

router.get('/dashboard/index', (req: express.Request, res: express.Response) => {
  console.log('connected')
  res.render('dashboard/index',{ message: 'connected' })
})

router.get('/dashboard/create-offer', (req: express.Request, res: express.Response) => {
  console.log('created')
  res.render('dashboard/createoffer')
})

router.post('/create-offer', createOffer)

router.get('/dashboard/profile', (req: express.Request, res: express.Response) => {
  res.render('dashboard/profile')
})

router.post('/dashboard/profile', editProfile)

export { router }
