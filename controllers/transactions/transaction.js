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
exports.createTransaction = exports.getAllTransactions = exports.verifyTransaction = void 0;
// import { Transaction } from '../../data/models/transaction'
var fetch = require('node-fetch');
var transaction_1 = require("../../data/models/transaction");
var user_1 = require("../../data/models/user");
var createTransaction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, amount, token, tokenSymbol, quote, user, InitiateTransaction, _res, reference, _b, _c, error_1;
    var _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                id = req.params.id;
                _a = req.body, amount = _a.amount, token = _a.token, tokenSymbol = _a.tokenSymbol, quote = _a.quote;
                _e.label = 1;
            case 1:
                _e.trys.push([1, 9, , 10]);
                return [4 /*yield*/, user_1["default"].findById(id)];
            case 2:
                user = _e.sent();
                return [4 /*yield*/, fetch('https://api.paystack.co/transaction/initialize', {
                        headers: {
                            'Authorization': "Bearer " + process.env.PAYSTACK_PRIVATE_API_KEY,
                            'Content-Type': 'application/json'
                        },
                        method: 'POST',
                        body: JSON.stringify({ email: user.email, amount: amount })
                    })];
            case 3:
                InitiateTransaction = _e.sent();
                if (!InitiateTransaction.ok) return [3 /*break*/, 6];
                return [4 /*yield*/, InitiateTransaction.json()];
            case 4:
                _res = _e.sent();
                console.log(_res);
                return [4 /*yield*/, transaction_1.Transaction.create({ customerId: id, customerProfile: {
                            name: user.name, email: user.email, phoneNumber: user.phoneNumber
                        }, amount: amount, token: token, tokenSymbol: tokenSymbol, quote: quote, reference: _res.data.reference })];
            case 5:
                reference = (_e.sent()).reference;
                res.json({ paymentUrl: _res.data['authorization_url'], reference: reference });
                return [3 /*break*/, 8];
            case 6:
                _c = (_b = res.status(400)).json;
                _d = { status: InitiateTransaction.status };
                return [4 /*yield*/, InitiateTransaction.json()];
            case 7:
                _c.apply(_b, [(_d.error = _e.sent(), _d)]);
                _e.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                error_1 = _e.sent();
                console.log(error_1.message);
                res.status(400).json(error_1.message);
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.createTransaction = createTransaction;
var verifyTransaction = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, reference, transactionStatusReq, transaction, _a, _b, _c, error_2;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                id = req.params.id;
                _d.label = 1;
            case 1:
                _d.trys.push([1, 8, , 9]);
                return [4 /*yield*/, transaction_1.Transaction.findById(id)];
            case 2:
                reference = (_d.sent()).reference;
                return [4 /*yield*/, fetch("https://api.paystack.co/transaction/verify/" + reference, {
                        headers: { "Authorization": "Bearer " + process.env.PAYSTACK_PRIVATE_API_KEY }
                    })];
            case 3:
                transactionStatusReq = _d.sent();
                if (!transactionStatusReq.ok) return [3 /*break*/, 5];
                return [4 /*yield*/, transactionStatusReq.json()];
            case 4:
                transaction = _d.sent();
                res.json({ status: transaction.data.status });
                return [3 /*break*/, 7];
            case 5:
                _b = (_a = console).log;
                _c = [transactionStatusReq.status];
                return [4 /*yield*/, transactionStatusReq.json()];
            case 6:
                _b.apply(_a, _c.concat([_d.sent()]));
                _d.label = 7;
            case 7: return [3 /*break*/, 9];
            case 8:
                error_2 = _d.sent();
                console.log(error_2.message);
                res.status(400).json(error_2);
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.verifyTransaction = verifyTransaction;
var getAllTransactions = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var Transactions, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, transaction_1.Transaction.find({})];
            case 1:
                Transactions = _a.sent();
                res.json(Transactions);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.log(error_3);
                res.status(400).json({ message: error_3.message });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllTransactions = getAllTransactions;
