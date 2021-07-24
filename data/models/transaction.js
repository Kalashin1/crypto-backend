"use strict";
exports.__esModule = true;
exports.Transaction = void 0;
var mongoose_1 = require("mongoose");
var transactions_1 = require("../Schemas/transactions");
var Transaction = mongoose_1.model('transaction', transactions_1.transactionSchema);
exports.Transaction = Transaction;
