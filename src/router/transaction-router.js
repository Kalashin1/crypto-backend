"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var transaction_1 = require("../controllers/transactions/transaction");
var router = express_1.Router();
exports.router = router;
router.post('/transaction', transaction_1.createTransaction);
