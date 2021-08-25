"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const mongoose_1 = require("mongoose");
const transactions_1 = require("../Schemas/transactions");
const Transaction = mongoose_1.model('transaction', transactions_1.transactionSchema);
exports.Transaction = Transaction;
