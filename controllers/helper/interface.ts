import { Document } from 'mongoose'

interface userInterface extends Document {
  name: any,
  email: any,
  phoneNumber: any,
  password: any
}

export { userInterface }