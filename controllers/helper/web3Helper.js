"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decryptEthWalletAndGetBalance = exports.web3 = void 0;
const Web3 = __importStar(require("web3"));
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
