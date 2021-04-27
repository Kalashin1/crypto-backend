import * as express from 'express'
import { Router } from 'express'

// OUR CUSTOM HANDLERS WILL BE IMPORTED HERE
import { createUserWithEmailAndPassword } from '../controllers/auth/auth-cont'

const router = Router();


// AUTH ROUTES
// SIGUP ROUTE AND HANDLER FUNCTION
router.post('/signup', createUserWithEmailAndPassword)

router.get('/', (req: express.Request, res: express.Response) => {
  res.setHeader('Content-Type','text/html')
  res.send('<h1>Hello World</h1>')
})


export default router