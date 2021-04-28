import { Document, Model } from 'mongoose'

interface userInterface extends Document{
  name: any,
  email: any,
  phoneNumber: any,
  password: any
}

<<<<<<< HEAD
interface loginUser extends Model<any> {
  login(email: string, password: string): userInterface
}
export { userInterface, loginUser }
=======
interface userModel extends Model<userInterface>{
  login(email:string, password: string): userInterface
}

export { userInterface, userModel }
>>>>>>> logout
