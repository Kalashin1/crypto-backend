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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __importStar(require("mongoose"));
const bcrypt = __importStar(require("bcrypt"));
// IMPORT THE USER SCHEMA
const user_1 = __importDefault(require("../Schemas/user"));
const web3Helper_1 = require("../../controllers/helper/web3Helper");
// functions for creating and encrypting some wallets
// BTC
const btcHelper_1 = require("../../controllers/helper/btcHelper");
// LTC
const ltcHelper_1 = require("../../controllers/helper/ltcHelper");
// DOGE
const dogeHelper_1 = require("../../controllers/helper/dogeHelper");
const saltRounds = 10;
//HASHING USERS PASSWORD
user_1.default.pre('save', async function (next) {
    if (this.password.length < 15) {
        let eth = web3Helper_1.web3.eth.accounts.create();
        const secrete = 'Foo, Bar, John, Doe, Guth';
        eth = web3Helper_1.web3.eth.accounts.encrypt(eth.privateKey, secrete);
        let btc = btcHelper_1.createAndEncryptBtcWallet(secrete);
        let ltc = await ltcHelper_1.createAndEncryptLtcWallet(secrete);
        let doge = await dogeHelper_1.createAndEncryptDogeWallet(secrete);
        this.wallet = { eth, btc, ltc, doge };
        // * hash the users password before we save it to the databse
        this.password = await bcrypt.hash(this.password, saltRounds);
        next();
    }
    next();
});
user_1.default.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    //  param if user with the email exists then compare passowrds
    if (user) {
        const result = await bcrypt.compare(password, user.password);
        if (result) {
            return user;
        }
        else {
            throw Error('incorrect password');
        }
    }
    throw Error('incorrect email, no user exists for this email');
};
user_1.default.statics.createOffer = async function (_id, offer) {
    const user = await mongoose.model('user').findById(_id);
    user === null || user === void 0 ? void 0 : user.trades.push(offer);
    console.log(user === null || user === void 0 ? void 0 : user.trades);
    await (user === null || user === void 0 ? void 0 : user.save());
    return user === null || user === void 0 ? void 0 : user.trades;
};
user_1.default.statics.editProfile = async function (_id, obj) {
    const user = await mongoose.model('user').findById(_id);
    const { country, state, secondaryEmail, phoneNumber, name, currency } = obj;
    user.country = country !== null && country !== void 0 ? country : user.country;
    user.state = state !== null && state !== void 0 ? state : user.state;
    user.secondaryEmail = secondaryEmail !== null && secondaryEmail !== void 0 ? secondaryEmail : user.secondaryEmail;
    user.phoneNumber = phoneNumber !== null && phoneNumber !== void 0 ? phoneNumber : user.phoneNumber;
    user.name = name !== null && name !== void 0 ? name : user.name;
    user.currency = currency !== null && currency !== void 0 ? currency : user.currency;
    await user.save();
    console.log(user);
    return user;
};
const userModel = mongoose.model('user', user_1.default);
exports.default = userModel;
