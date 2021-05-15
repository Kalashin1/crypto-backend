import { Schema } from 'mongoose'

import { ObjectID } from 'mongodb'

import { Offer } from '../../controllers/helper/interface'

const offerSchema:Schema<Offer> = new Schema({
  accepting: {
    type: String,
    required: [true, 'please provide a currency or token']
  },
  exchanging: {
    type: String,
    required: [true, 'please provide a currency or token']
  },
  min: {
    type: Number,
    required: [true, 'provide your min exchnage amount']
  },
  max: {
    type: Number,
    required: [true, 'provide your max exchange amount']
  },
  quote: {
    type: String,
    required: [true, 'provide your max exchange amount']
  },
  owner: {
    name: String,
    email: String,
    id: ObjectID,
    phoneNumber: Number
  }
})

export { offerSchema }