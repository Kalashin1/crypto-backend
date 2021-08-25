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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = __importStar(require("mongoose"));
var bcrypt = __importStar(require("bcrypt"));
var user_1 = __importDefault(require("../Schemas/user"));
var web3Helper_1 = require("../../controllers/helper/web3Helper");
var btcHelper_1 = require("../../controllers/helper/btcHelper");
var ltcHelper_1 = require("../../controllers/helper/ltcHelper");
var dogeHelper_1 = require("../../controllers/helper/dogeHelper");
var saltRounds = 10;
user_1.default.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function () {
        var eth, secrete, btc, ltc, doge, _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!(this.password.length < 15)) return [3, 4];
                    eth = web3Helper_1.web3.eth.accounts.create();
                    secrete = 'Foo, Bar, John, Doe, Guth';
                    eth = web3Helper_1.web3.eth.accounts.encrypt(eth.privateKey, secrete);
                    btc = btcHelper_1.createAndEncryptBtcWallet(secrete);
                    return [4, ltcHelper_1.createAndEncryptLtcWallet(secrete)];
                case 1:
                    ltc = _b.sent();
                    return [4, dogeHelper_1.createAndEncryptDogeWallet(secrete)];
                case 2:
                    doge = _b.sent();
                    this.wallet = { eth: eth, btc: btc, ltc: ltc, doge: doge };
                    _a = this;
                    return [4, bcrypt.hash(this.password, saltRounds)];
                case 3:
                    _a.password = _b.sent();
                    next();
                    _b.label = 4;
                case 4:
                    next();
                    return [2];
            }
        });
    });
});
user_1.default.statics.login = function (email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var user, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, this.findOne({ email: email })];
                case 1:
                    user = _a.sent();
                    if (!user) return [3, 3];
                    return [4, bcrypt.compare(password, user.password)];
                case 2:
                    result = _a.sent();
                    if (result) {
                        return [2, user];
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
user_1.default.statics.createOffer = function (_id, offer) {
    return __awaiter(this, void 0, void 0, function () {
        var user;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, mongoose.model('user').findById(_id)];
                case 1:
                    user = _a.sent();
                    user === null || user === void 0 ? void 0 : user.trades.push(offer);
                    console.log(user === null || user === void 0 ? void 0 : user.trades);
                    return [4, (user === null || user === void 0 ? void 0 : user.save())];
                case 2:
                    _a.sent();
                    return [2, user === null || user === void 0 ? void 0 : user.trades];
            }
        });
    });
};
user_1.default.statics.editProfile = function (_id, obj) {
    return __awaiter(this, void 0, void 0, function () {
        var user, country, state, secondaryEmail, phoneNumber, name, currency;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, mongoose.model('user').findById(_id)];
                case 1:
                    user = _a.sent();
                    country = obj.country, state = obj.state, secondaryEmail = obj.secondaryEmail, phoneNumber = obj.phoneNumber, name = obj.name, currency = obj.currency;
                    user.country = country !== null && country !== void 0 ? country : user.country;
                    user.state = state !== null && state !== void 0 ? state : user.state;
                    user.secondaryEmail = secondaryEmail !== null && secondaryEmail !== void 0 ? secondaryEmail : user.secondaryEmail;
                    user.phoneNumber = phoneNumber !== null && phoneNumber !== void 0 ? phoneNumber : user.phoneNumber;
                    user.name = name !== null && name !== void 0 ? name : user.name;
                    user.currency = currency !== null && currency !== void 0 ? currency : user.currency;
                    return [4, user.save()];
                case 2:
                    _a.sent();
                    console.log(user);
                    return [2, user];
            }
        });
    });
};
var userModel = mongoose.model('user', user_1.default);
exports.default = userModel;
