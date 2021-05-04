import * as cryptoJs from 'crypto-js'

import * as bitcore from 'bitcore-lib'


import * as fetch from 'node-fetch'

const createAndEncryptWallet = (password: string) => {

  // * Generate a random BTC address
  const keyPair = new bitcore.PrivateKey()

  const address = keyPair.toAddress().toString()  // retrieve the wallet address

  const privateKey = keyPair.toWIF()              //  retrieve the private key

  let btc: any = { address, privateKey }

  btc = cryptoJs.AES.encrypt(JSON.stringify(btc), password).toString()

  return btc

}

const decryptBtcWallet = async (user: any, password: string) => {

  // console.log(user.wallet.btc)

  const bytes = cryptoJs.AES.decrypt(user.wallet.btc, password)

  let btc = JSON.parse(bytes.toString(cryptoJs.enc.Utf8))

  let res:any = await fetch(`https://blockchain.info/rawaddr/${btc.address}`)

  let bal: any = await res.json()

  // console.log(bal)

  btc.balance = bal.final_balance

  return btc

}

export { createAndEncryptWallet, decryptBtcWallet }