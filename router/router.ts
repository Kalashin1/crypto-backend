import * as express from 'express'
import { Router } from 'express'

// OUR CUSTOM HANDLERS WILL BE IMPORTED HERE
import { 
  createUserWithEmailAndPassword,
  loginUserWithEmailAndPassword,
<<<<<<< HEAD
  logoutUser 
} from '../controllers/auth/auth-cont'
=======
  logoutUser
 } from '../controllers/auth/auth-cont'

 // validating and obtaining user modules
 import { validateUser } from '../controllers/auth/validate-user'
>>>>>>> logout

const router = Router();


// AUTH ROUTES

<<<<<<< HEAD
// signup route and handler function
=======
// SIGUP ROUTE AND HANDLER FUNCTION
>>>>>>> logout
router.post('/signup', createUserWithEmailAndPassword)

// login route and handler function
router.post('/login', loginUserWithEmailAndPassword)

<<<<<<< HEAD
// logout route and handler function
// router.get('/logout', logoutUser)

=======
//logout route and handler function
router.get('/logout', logoutUser)
>>>>>>> logout

router.get('/', (req: express.Request, res: express.Response) => {
  console.log('connected')
  res.setHeader('Content-Type','text/html')
  res.send('<h1>Hello World</h1>')
})


export default router