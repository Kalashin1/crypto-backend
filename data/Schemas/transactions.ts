import { ObjectID } from 'mongodb'
import { Schema, ObjectId } from 'mongoose'

import { transactionInterface } from '../../controllers/helper/interface'

const transactionSchema:Schema<transactionInterface> = new Schema({
  base: {
    type: String,
    required: [true, 'please provide the base currency']
  },
  quote: {
    type: String,
    required: [true, 'please provide the quote currency']
  },
  amount: {
    type: String,
    required: [true, 'please provide the amount you are purchasing']
  },
  quotePrice: {
    type: String,
    required: [true, 'please provide the quote price']
  },
  buyer: {
    type: {
      name: String,
      id: ObjectID,
      email: String
    },
    required: [true, 'please provide the buyer']
  },
  seller: {
    type: {
      name: String,
      id: ObjectID,
      email: String
    },
    required: [true, 'please provide the Seller']
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  status: {
    type: String,
    default: 'pending'
  }
})

export { transactionSchema }