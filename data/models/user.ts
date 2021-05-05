import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt'


// IMPORT THE USER SCHEMA 
import userSchema from '../Schemas/user'

import { userInterface, userModel } from '../../controllers/helper/interface'

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

    // * before encrypt password, create an ETH wallet, encrypt it with the password and save it to the user

    let eth = web3.eth.accounts.create()       

    eth = web3.eth.accounts.encrypt(eth.privateKey, this.password)

    let btc = createAndEncryptBtcWallet(this.password)

    let ltc = await createAndEncryptLtcWallet(this.password)

    let doge = await createAndEncryptDogeWallet(this.password)

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


      // * if the passwords match then decrypt the wallet and send it along with the user
      const decryptedAccount = web3.eth.accounts.decrypt(user.wallet.eth, password)

      user.wallet.eth = decryptedAccount

      return user 

    }

    else {

      throw Error('incorrect password')

    }

  }

  throw Error('incorrect email, no user exists for this email')

}

const userModel = mongoose.model<userInterface, userModel>('user',userSchema)

export default userModel