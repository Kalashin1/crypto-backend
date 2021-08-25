// import { Transaction } from '../../data/models/transaction'

import express from 'express'

const createTransaction = async (req: express.Request, res: express.Response) => {


  res.json({message: 'recieved'})
}

export { createTransaction }