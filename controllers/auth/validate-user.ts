import * as jwt from 'jsonwebtoken'

import express from 'express'

import userModel from '../../data/models/user';

import { decryptEthWalletAndGetBalance } from '../helper/web3Helper'

import { decryptBtcWallet } from '../helper/btcHelper'

import { decryptLtcWallet } from '../helper/ltcHelper'

import { decryptDogeWallet } from '../helper/dogeHelper'



const validateUser = (req: express.Request, res: express.Response, next: Function) => {
  const token:string = req.headers.token.toString()
  if(token){
    jwt.verify(token, 'my secrete key', (err, decodedToken) => {
      if(err){
        // console.log(err.message)
        res.status(400).json(err.message)
      }
      else{
        // console.log(decodedToken)
        next()
      }
    })
  }
  else{
    // console.log('no cookie')
    res.status(400).json('you are not logged in')
  }
}

const getUser = (req: express.Request, res: express.Response) => {
  const token = req.headers.token.toString()

  if (token) {
    jwt.verify(token, 'my secrete key', async (err, decodedToken: any) => {
      if(err){
        console.log(err);
      }
      else{

        const secrete = 'Foo, Bar, John, Doe, Guth'

        const user = await userModel.findById(decodedToken.id)

        const eth = await decryptEthWalletAndGetBalance(user, secrete, false)

        const btc = await decryptBtcWallet(user, secrete)

        const ltc = await decryptLtcWallet(user, secrete)

        const doge = await decryptDogeWallet(user, secrete)

     

        res.json({ 
          name: user?.name, 
          email: user?.email, 
          offers: user?.trades, 
          id: user?._id,
          wallet: {eth, btc, ltc, doge},
          secondaryEmail: user?.secondaryEmail,
          phoneNumber: user.phoneNumber,
          currency: user.currency,
          state: user.state,
          country: user.country
        })

      }
    })
  }
  else{
    // console.log('no cookie')
    res.status(400).json('you are not logged in')
  }
}

export { validateUser, getUser}
