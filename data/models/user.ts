import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt'

// IMPORT THE USER SCHEMA 
import userSchema from '../Schemas/user'

<<<<<<< HEAD
import { userInterface, loginUser } from '../../controllers/helper/interface'
=======
import { userInterface, userModel } from '../../controllers/helper/interface'
>>>>>>> logout

const saltRounds = 10


//HASHING USERS PASSWORD
userSchema.pre('save', async function(next){
  if(this.password.length < 15){
    this.password = await bcrypt.hash(this.password, saltRounds)
    next()
  }
  next()

})

<<<<<<< HEAD


// STATIC METHODS 
// LOGIN 
userSchema.statics.login = async function(email: string, password: string) {
  // ensure the email exists inside the database

=======
userSchema.statics.login = async function(email:string, password:string) {
  
>>>>>>> logout
  const user = await this.findOne({email})
  // if user with the email exists then compare passowrds
  if(user){
    const result = await bcrypt.compare(password, user.password)
    if(result){
      return user
    }
    else{
      throw Error('incorrect password')
    }
  }
  throw Error('incorrect email, no user exists for this email')
}

<<<<<<< HEAD
const userModel = mongoose.model<userInterface, loginUser>('user',userSchema)
=======
const userModel = mongoose.model<userInterface, userModel>('user',userSchema)
>>>>>>> logout

export default userModel