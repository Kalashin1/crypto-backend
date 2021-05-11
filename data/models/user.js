"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var mongoose = require("mongoose");
var bcrypt = require("bcrypt");
// IMPORT THE USER SCHEMA
var user_1 = require("../Schemas/user");
var web3Helper_1 = require("../../controllers/helper/web3Helper");
// functions for creating and encrypting some wallets
// BTC
var btcHelper_1 = require("../../controllers/helper/btcHelper");
// LTC
var ltcHelper_1 = require("../../controllers/helper/ltcHelper");
// DOGE
var dogeHelper_1 = require("../../controllers/helper/dogeHelper");
var saltRounds = 10;
//HASHING USERS PASSWORD
user_1["default"].pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var eth, secrete, btc, ltc, doge, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(this.password.length < 15)) return [3 /*break*/, 4];
                    eth = web3Helper_1.web3.eth.accounts.create();
                    secrete = 'Foo, Bar, John, Doe, Guth';
                    eth = web3Helper_1.web3.eth.accounts.encrypt(eth.privateKey, secrete);
                    btc = btcHelper_1.createAndEncryptBtcWallet(secrete);
                    return [4 /*yield*/, ltcHelper_1.createAndEncryptLtcWallet(secrete)];
                case 1:
                    ltc = _b.sent();
                    return [4 /*yield*/, dogeHelper_1.createAndEncryptDogeWallet(secrete)];
                case 2:
                    doge = _b.sent();
                    this.wallet = { eth: eth, btc: btc, ltc: ltc, doge: doge };
                    // * hash the users password before we save it to the databse
                    _a = this;
                    return [4 /*yield*/, bcrypt.hash(this.password, saltRounds)];
                case 3:
                    // * hash the users password before we save it to the databse
                    _a.password = _b.sent();
                    next();
                    _b.label = 4;
                case 4:
                    next();
                    return [2 /*return*/];
            }
        });
    });
});
user_1["default"].statics.login = function (email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var user, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, this.findOne({ email: email })
                    //  param if user with the email exists then compare passowrds
                ];
                case 1:
                    user = _a.sent();
                    if (!user) return [3 /*break*/, 3];
                    return [4 /*yield*/, bcrypt.compare(password, user.password)];
                case 2:
                    result = _a.sent();
                    if (result) {
                        return [2 /*return*/, user];
                    }
                    else {
                        throw Error('incorrect password');
                    }
                    _a.label = 3;
                case 3: throw Error('incorrect email, no user exists for this email');
            }
        });
    });
};
user_1["default"].statics.createOffer = function (_id, offer) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, mongoose.model('user').findById(_id)];
                case 1:
                    user = _a.sent();
                    user === null || user === void 0 ? void 0 : user.offers.push(offer);
                    console.log(user === null || user === void 0 ? void 0 : user.offers);
                    return [2 /*return*/, user === null || user === void 0 ? void 0 : user.offers];
            }
        });
    });
};
var userModel = mongoose.model('user', user_1["default"]);
exports["default"] = userModel;
