import * as express from 'express'
import { Router } from 'express'


import { createTransaction } from '../controllers/transactions/transaction'

// validating and obtaining user modules
 import { validateUser } from '../controllers/auth/validate-user'

const router = Router();

router.post('/transaction', createTransaction)


export { router }