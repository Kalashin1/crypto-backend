import * as Web3 from 'web3'

const url = 'https://kovan.infura.io/v3/b96ec2452bf040789706d7e4a53be119'

const mainNet = 'https://mainnet.infura.io/v3/b96ec2452bf040789706d7e4a53be119'

const web3 = new Web3(mainNet)

export { web3 }