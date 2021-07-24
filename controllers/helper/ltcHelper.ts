
import * as cryptoJs from 'crypto-js'

import * as fetch from 'node-fetch'

const createAndEncryptLtcWallet = async (password: string) => {
  
  // * Generate a random LTC address
  
  try {
    
    const res = await fetch(`https://api.blockcypher.com/v1/ltc/main/addrs`, {
      method: 'POST'
    });

  

    const keyPair = await res.json()

    const { address, private: privateKey } = keyPair

    let ltc: any = { address, privateKey }

    // console.table({ ltc })

    ltc = cryptoJs.AES.encrypt(JSON.stringify(ltc), password).toString()

    return ltc

  } catch (error) {
    console.log(error)
  }

}

const decryptLtcWallet = async (user: any, password: string) => {


  const bytes = cryptoJs.AES.decrypt(user.wallet.ltc, password)

  let ltc = JSON.parse(bytes.toString(cryptoJs.enc.Utf8))


  let res:any = await fetch(`https://api.blockcypher.com/v1/ltc/main/addrs/${ltc.address}/balance`)


  let bal: any = await res.json()


  ltc.balance = bal.final_balance

  return ltc

}


export { createAndEncryptLtcWallet, decryptLtcWallet }