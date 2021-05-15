
import * as cryptoJs from 'crypto-js'

import * as fetch from 'node-fetch'

const createAndEncryptDogeWallet = async (password: string) => {
  
  // * Generate a random LTC address
  
  try {
    
    const res = await fetch(`https://api.blockcypher.com/v1/doge/main/addrs`, {
      method: 'POST'
    });

  

    const keyPair = await res.json()

    const { address, private: privateKey } = keyPair

    let doge: any = { address, privateKey }

    // console.table({ doge })

    doge = cryptoJs.AES.encrypt(JSON.stringify(doge), password).toString()

    return doge

  } 
  
  catch (error) {

    console.log(error)

  }

}

const decryptDogeWallet = async (user: any, password: string) => {

  console.log(user.wallet.doge)

  const bytes = cryptoJs.AES.decrypt(user.wallet.doge, password)

  let doge = JSON.parse(bytes.toString(cryptoJs.enc.Utf8))

  console.log(doge)


  let res:any = await fetch(`https://api.blockcypher.com/v1/doge/main/addrs/${doge.address}/balance`)

  console.log(res)

  let bal: any = await res.json()

  console.log(bal)

  doge.balance = bal.final_balance

  return doge

}


export { createAndEncryptDogeWallet, decryptDogeWallet }