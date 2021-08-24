"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTransaction = void 0;
const createTransaction = async (req, res) => {
    const { base, quote, amount, quotePrice, buyer, seller } = req.body;
    res.json({ message: 'recieved' });
};
exports.createTransaction = createTransaction;
