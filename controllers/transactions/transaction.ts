import { Transaction } from '../../data/models/transaction'

import express from 'express'

const createTransaction = async (req: express.Request, res: express.Response) => {
  const {
    base, 
    quote,
    amount,
    quotePrice,
    buyer,
    seller
  } = req.body


  res.json({message: 'recieved'})
}

export { createTransaction }