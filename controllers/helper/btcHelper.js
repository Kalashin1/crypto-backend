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
exports.decryptBtcWallet = exports.createAndEncryptBtcWallet = void 0;
const cryptoJs = __importStar(require("crypto-js"));
const bitcore = __importStar(require("bitcore-lib"));
const fetch = __importStar(require("node-fetch"));
const createAndEncryptBtcWallet = (password) => {
    // * Generate a random BTC address
    const keyPair = new bitcore.PrivateKey();
    const address = keyPair.toAddress().toString(); // retrieve the wallet address
    const privateKey = keyPair.toWIF(); //  retrieve the private key
    let btc = { address, privateKey };
    btc = cryptoJs.AES.encrypt(JSON.stringify(btc), password).toString();
    return btc;
};
exports.createAndEncryptBtcWallet = createAndEncryptBtcWallet;
const decryptBtcWallet = async (user, password) => {
    // console.log(user.wallet.btc)
    const bytes = cryptoJs.AES.decrypt(user.wallet.btc, password);
    let btc = JSON.parse(bytes.toString(cryptoJs.enc.Utf8));
    let res = await fetch(`https://blockchain.info/rawaddr/${btc.address}`);
    let bal = await res.json();
    // console.log(bal)
    btc.balance = bal.final_balance;
    return btc;
};
exports.decryptBtcWallet = decryptBtcWallet;
