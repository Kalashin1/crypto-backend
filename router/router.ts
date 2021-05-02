import * as express from 'express'
import { Router } from 'express'


// OUR CUSTOM HANDLERS WILL BE IMPORTED HERE
import { 
  createUserWithEmailAndPassword,
  loginUserWithEmailAndPassword,
  logoutUser
 } from '../controllers/auth/auth-cont'

 // validating and obtaining user modules
 import { validateUser } from '../controllers/auth/validate-user'

const router = Router();


// AUTH ROUTES

// SIGUP ROUTE AND HANDLER FUNCTION
router.post('/signup', createUserWithEmailAndPassword)

// login route and handler function
router.post('/login', loginUserWithEmailAndPassword)

//logout route and handler function
router.get('/logout', logoutUser)

router.get('/', (req: express.Request, res: express.Response) => {
  console.log('connected')
  res.json({ message: 'connected' })
})


export { router }