import { Document, Model } from 'mongoose'

interface Offer extends Document {
  accepting: string,
  exchanging: string,
  min: number,
  max: number,
  quote: string
  owner?: { name: string, phoneNumber: number, email: string, id: any }
}

interface offerModel extends Model<Offer> {

}

interface profileEdit {
  name?: string, 
  phoneNumber?: any,
  state?: string,
  address?: string,
  country?: string,
  secondaryEmail?: string
}


interface userInterface extends Document{
  name: string,
  email: string,
  phoneNumber: any,
  password: string,
  wallet: any,
  offers: Offer[],
  secondaryEmail: string,
  address: string,
  displayImage: string,
  country: string,
  state: string
}

interface userModel extends Model<userInterface>{
  login(email:string, password: string): userInterface,
  createOffer(id:string, offer:Offer): Offer,
  editProfile(id: string, obj: profileEdit): userInterface
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

export { userInterface, userModel, transactionInterface, Offer, offerModel, profileEdit }
