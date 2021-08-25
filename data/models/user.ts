import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt'


// IMPORT THE USER SCHEMA
import userSchema from '../Schemas/user'

import { userInterface, userModel, Trade, profileEdit } from '../../controllers/helper/interface'

import { web3 } from '../../controllers/helper/web3Helper'

// functions for creating and encrypting some wallets

// BTC
import { createAndEncryptBtcWallet } from '../../controllers/helper/btcHelper'

// LTC
import { createAndEncryptLtcWallet } from '../../controllers/helper/ltcHelper'

// DOGE
import { createAndEncryptDogeWallet } from '../../controllers/helper/dogeHelper'

const saltRounds = 10



//HASHING USERS PASSWORD
userSchema.pre('save', async function(next){

  if(this.password.length < 15){



    let eth = web3.eth.accounts.create()

    const secrete = 'Foo, Bar, John, Doe, Guth'

    eth = web3.eth.accounts.encrypt(eth.privateKey, secrete)

    let btc = createAndEncryptBtcWallet(secrete)

    let ltc = await createAndEncryptLtcWallet(secrete)

    let doge = await createAndEncryptDogeWallet(secrete)

    this.wallet = { eth, btc, ltc, doge }

    // * hash the users password before we save it to the databse

    this.password = await bcrypt.hash(this.password, saltRounds)

    next()

  }

  next()

})

userSchema.statics.login = async function(email:string, password:string) {

  const user = await this.findOne({email})
  //  param if user with the email exists then compare passowrds
  if(user){



    const result = await bcrypt.compare(password, user.password)

    if(result){

      return user

    }

    else {

      throw Error('incorrect password')

    }

  }

  throw Error('incorrect email, no user exists for this email')

}


userSchema.statics.createOffer = async function (_id, offer: Trade) {
  const user = await mongoose.model<userInterface, userModel>('user').findById(_id);
  user?.trades.push(offer)
  console.log(user?.trades)
  await user?.save()
  return user?.trades
}


userSchema.statics.editProfile = async function (_id: string, obj: profileEdit) {
  const user = await mongoose.model<userInterface, userModel>('user').findById(_id)
  const { country, state, secondaryEmail, phoneNumber, name, currency } = obj

  user.country = country ?? user.country
  user.state = state ?? user.state
  user.secondaryEmail = secondaryEmail ?? user.secondaryEmail
  user.phoneNumber = phoneNumber ?? user.phoneNumber
  user.name = name ?? user.name
  user.currency = currency ?? user.currency

  await user.save()
    console.log(user)
  return user
}

const userModel = mongoose.model<userInterface, userModel>('user',userSchema)

export default userModel
