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
exports.getUser = exports.validateUser = void 0;
var jwt = require("jsonwebtoken");
var user_1 = require("../../data/models/user");
var web3Helper_1 = require("../helper/web3Helper");
var btcHelper_1 = require("../helper/btcHelper");
var ltcHelper_1 = require("../helper/ltcHelper");
var dogeHelper_1 = require("../helper/dogeHelper");
var validateUser = function (req, res, next) {
    var token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'my secrete key', function (err, decodedToken) {
            if (err) {
                // console.log(err.message)
                res.status(400).json(err.message);
            }
            else {
                // console.log(decodedToken)
                next();
            }
        });
    }
    else {
        // console.log('no cookie')
        res.status(400).json('you are not logged in');
    }
};
exports.validateUser = validateUser;
var getUser = function (req, res) {
    var token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'my secrete key', function (err, decodedToken) { return __awaiter(void 0, void 0, void 0, function () {
            var secrete, user, eth, btc, ltc, doge;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!err) return [3 /*break*/, 1];
                        console.log(err);
                        return [3 /*break*/, 7];
                    case 1:
                        secrete = 'Foo, Bar, John, Doe, Guth';
                        return [4 /*yield*/, user_1["default"].findById(decodedToken.id)];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, web3Helper_1.decryptEthWalletAndGetBalance(user, secrete, false)];
                    case 3:
                        eth = _a.sent();
                        return [4 /*yield*/, btcHelper_1.decryptBtcWallet(user, secrete)];
                    case 4:
                        btc = _a.sent();
                        return [4 /*yield*/, ltcHelper_1.decryptLtcWallet(user, secrete)];
                    case 5:
                        ltc = _a.sent();
                        return [4 /*yield*/, dogeHelper_1.decryptDogeWallet(user, secrete)];
                    case 6:
                        doge = _a.sent();
                        res.json({ name: user === null || user === void 0 ? void 0 : user.name, email: user === null || user === void 0 ? void 0 : user.email, id: user === null || user === void 0 ? void 0 : user._id, wallet: { eth: eth, btc: btc, ltc: ltc, doge: doge } });
                        _a.label = 7;
                    case 7: return [2 /*return*/];
                }
            });
        }); });
    }
    else {
        // console.log('no cookie')
        res.status(400).json('you are not logged in');
    }
};
exports.getUser = getUser;
