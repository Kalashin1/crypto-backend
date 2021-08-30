import { Document, Model, ObjectId } from 'mongoose'

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
  _id: ObjectId
  reference: string,
  customerId: ObjectId
  customerProfile: any
  status: string
  amount: number
  token: string
  tokenSymbol: string
  quote: number
}

export interface TransactionModel extends Model<transactionInterface> {

}

export interface INotification extends Document {
  _id: ObjectId
  customer: any
  customerId: ObjectId
  text: string
  type: string
  isRead: boolean
  status: string
  date: Date
  markAsRead: () => Promise<INotification>
}

export interface NotificationModel extends Model<INotification> {

}

export { userInterface, userModel, transactionInterface, Trade, TradeModel, profileEdit }
