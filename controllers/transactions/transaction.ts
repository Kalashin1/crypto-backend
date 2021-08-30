// import { Transaction } from '../../data/models/transaction'
const fetch = require('node-fetch')
import { Request, Response } from 'express'
import { Transaction } from '../../data/models/transaction';
import userModel from '../../data/models/user'

const createTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { amount, token, tokenSymbol, quote }  = req.body
  try {
    const user = await userModel.findById(id)
    const InitiateTransaction = await fetch('https://api.paystack.co/transaction/initialize', {
      headers: {
        'Authorization': `Bearer ${process.env.PAYSTACK_PRIVATE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({ email: user.email, amount })
    })
    if (InitiateTransaction.ok) {
      const _res = await InitiateTransaction.json()
      console.log(_res);
      const { reference } = await Transaction.create({ customerId: id, customerProfile: {
          name: user.name, email: user.email, phoneNumber: user.phoneNumber
        },
        amount, token, tokenSymbol, quote, reference: _res.data.reference
      })
      res.json({ paymentUrl: _res.data['authorization_url'], reference })
    } else{
      res.status(400).json({ status: InitiateTransaction.status, error:  await InitiateTransaction.json() })
    }
  } catch (error) {
    console.log(error.message)
    res.status(400).json(error.message)
  }

}

export const verifyTransaction = async (req: Request, res: Response) => {
  const { id } = req.params
  
  try {
    const { reference } = await Transaction.findById(id)
    const transactionStatusReq = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
      headers: {"Authorization": `Bearer ${process.env.PAYSTACK_PRIVATE_API_KEY}`}
    })

    if (transactionStatusReq.ok) {
      const transaction = await transactionStatusReq.json()
      res.json({ status: transaction.data.status})
    } else {
      console.log(transactionStatusReq.status, await transactionStatusReq.json())
    }
  } catch (error) {
    console.log(error.message)
    res.status(400).json(error)
  }
}

export const getAllTransactions = async (_req: Request, res: Response) => {
  try {
    const Transactions = await Transaction.find({})
    res.json(Transactions)
  } catch (error) {
    console.log(error)
    res.status(400).json({ message: error.message })
  }
}

export { createTransaction }