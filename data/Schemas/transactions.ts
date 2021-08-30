import { ObjectID } from 'mongodb'
import { Schema } from 'mongoose'

import { transactionInterface } from '../../controllers/helper/interface'

const transactionSchema:Schema<transactionInterface> = new Schema({
  reference: {
    type: String,
    required: [true, 'please provide the reference to the transaction']
  },
  customerId: {
    type: ObjectID,
    required: [true, 'Please provide the Id of the customer the transaction belongs to.']
  },
  customerProfile: {
    name: {
      type: String,
      required: [true, 'Please provide the name of the customer.']
    },
    email: {
      type: String,
      required: [true, 'Please provide the email of the customer.']
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please provide the phone number of the customer.']
    }
  },
  status: {
    type: String,
    default: 'initialized'
  },
  amount: {
    type: Number,
    required: [true, 'Please provide the amount of the transaction.']
  },
  token: {
    type: String,
    required: [true, 'Please provide the token the customer is trying to purchase.']
  },
  tokenSymbol: {
    type: String,
    required: [true, 'Please provide the symbol of the token.']
  },
  quote: {
    type: String,
    required: [true, 'Please provide the quote for this transaction.']
  }
})

export { transactionSchema }