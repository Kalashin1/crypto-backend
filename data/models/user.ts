import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt'

// IMPORT THE USER SCHEMA 
import userSchema from '../Schemas/user'

import { userInterface } from '../../controllers/helper/interface'

const saltRounds = 10


//HASHING USERS PASSWORD
userSchema.pre('save', async function(next){
  if(this.password.length < 15){
    this.password = await bcrypt.hash(this.password, saltRounds)
    next()
  }
  next()

})

const userModel = mongoose.model('user',userSchema)

export default userModel