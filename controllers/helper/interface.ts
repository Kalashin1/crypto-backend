import { Document, Model } from 'mongoose'

interface offer {
  accepting: string,
  exchanging: string,
  min: number,
  max: number
}
interface userInterface extends Document{
  name: string,
  email: string,
  phoneNumber: any,
  password: string,
  wallet: any,
  offers: offer[]
}

interface userModel extends Model<userInterface>{
  login(email:string, password: string): userInterface
}


interface transactionInterface extends Document {
  base: string,
  quote: string,
  amount: string,
  quotePrice: string,
  buyer: {
    name: string,
    id: any,
    email: string
  },
  seller: {
    name: string,
    id: any,
    email: string
  },
  createdAt: Date,
  status: 'pending' | 'failed' | 'successful'
}

export { userInterface, userModel, transactionInterface }
