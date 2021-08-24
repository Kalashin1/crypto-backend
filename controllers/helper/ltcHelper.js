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
exports.decryptLtcWallet = exports.createAndEncryptLtcWallet = void 0;
const cryptoJs = __importStar(require("crypto-js"));
const fetch = __importStar(require("node-fetch"));
const createAndEncryptLtcWallet = async (password) => {
    // * Generate a random LTC address
    try {
        const res = await fetch(`https://api.blockcypher.com/v1/ltc/main/addrs`, {
            method: 'POST'
        });
        const keyPair = await res.json();
        const { address, private: privateKey } = keyPair;
        let ltc = { address, privateKey };
        // console.table({ ltc })
        ltc = cryptoJs.AES.encrypt(JSON.stringify(ltc), password).toString();
        return ltc;
    }
    catch (error) {
        console.log(error);
    }
};
exports.createAndEncryptLtcWallet = createAndEncryptLtcWallet;
const decryptLtcWallet = async (user, password) => {
    const bytes = cryptoJs.AES.decrypt(user.wallet.ltc, password);
    let ltc = JSON.parse(bytes.toString(cryptoJs.enc.Utf8));
    let res = await fetch(`https://api.blockcypher.com/v1/ltc/main/addrs/${ltc.address}/balance`);
    let bal = await res.json();
    ltc.balance = bal.final_balance;
    return ltc;
};
exports.decryptLtcWallet = decryptLtcWallet;
