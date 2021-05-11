import * as mongoose from 'mongoose'

import { userInterface } from '../../controllers/helper/interface'
import { isEmail, isPassword } from '../validators/validator'

const userSchema:mongoose.Schema<userInterface> = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please provide a name for the user'],
    minlength: [5, 'your name cannot be less than five letters']
  },
  email: {
    type: String,
    required: [true, 'please provide an email for the user'],
    unique: true,
    validate: [isEmail, 'please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'please provide a password for your user'],
    validate: [isPassword, 'your password should contain a number, uppercase and lowercase letter']
  },
  phoneNumber : {
    type: Number,
    required: [true, 'please provide your phone number']
  },
  wallet: {
    type: Object
  },
  secondaryEmail: {
    type: String
  },
  displayImage: {
    type: String
  },
  country: {
    type: String
  },
  state: {
    type: String
  },
  offers: [],
})

export default userSchema