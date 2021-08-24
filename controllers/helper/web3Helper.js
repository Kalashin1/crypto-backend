"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptEthWalletAndGetBalance = exports.web3 = void 0;
const Web3 = require('web3');
const url = 'https://kovan.infura.io/v3/b96ec2452bf040789706d7e4a53be119';
const mainNet = 'https://mainnet.infura.io/v3/b96ec2452bf040789706d7e4a53be119';
const web3 = new Web3(mainNet);
exports.web3 = web3;
const decryptEthWalletAndGetBalance = async (user, password, login) => {
    // console.log(user.wallet.eth)
    let ethWallet;
    if (login) {
        ethWallet = user.wallet.eth;
        const address = web3.eth.Iban.toIban(ethWallet.address);
        let balance = await web3.eth.getBalance(address);
        ethWallet.balance = web3.utils.fromWei(balance, 'ether');
    }
    else {
        ethWallet = web3.eth.accounts.decrypt(user.wallet.eth, password);
        const address = web3.eth.Iban.toIban(ethWallet.address);
        let balance = await web3.eth.getBalance(address);
        ethWallet.balance = web3.utils.fromWei(balance, 'ether');
    }
    return ethWallet;
};
exports.decryptEthWalletAndGetBalance = decryptEthWalletAndGetBalance;
