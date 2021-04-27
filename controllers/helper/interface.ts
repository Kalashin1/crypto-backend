import { Document, Model } from 'mongoose'

interface userInterface extends Document{
  name: any,
  email: any,
  phoneNumber: any,
  password: any
}

interface loginUser extends Model<any> {
  login(email: string, password: string): userInterface
}
export { userInterface, loginUser }