import { Router } from 'express'


import { createTransaction, getAllTransactions, verifyTransaction } from '../controllers/transactions/transaction'

// validating and obtaining user modules
 import { validateUser } from '../controllers/auth/validate-user'

const router = Router();

router.post('/transaction/:id', createTransaction)

router.get('/transactions', getAllTransactions)

router.get('/transaction/verify/:id', verifyTransaction)

export { router }