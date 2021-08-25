import { Document, Model } from 'mongoose'

interface Trade extends Document {
  
}

interface TradeModel extends Model<Trade> {

}

interface profileEdit {
  name?: string, 
  phoneNumber?: any,
  state?: string,
  currency?: string,
  country?: string,
  secondaryEmail?: string
}


interface userInterface extends Document{
  name: string,
  email: string,
  phoneNumber: any,
  password: string,
  currency: string,
  wallet: any,
  trades: Trade[],
  secondaryEmail: string,
  displayImage: string,
  country: string,
  state: string
}

interface userModel extends Model<userInterface>{
  login(email:string, password: string): userInterface,
  createOffer(id:string, trade:Trade): Trade,
  editProfile(id: string, obj: profileEdit): userInterface
}


interface transactionInterface extends Document {
  
}

export { userInterface, userModel, transactionInterface, Trade, TradeModel, profileEdit }
