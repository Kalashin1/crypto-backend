"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactionSchema = void 0;
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
const transactionSchema = new mongoose_1.Schema({
    base: {
        type: String,
        required: [true, 'please provide the base currency']
    },
    quote: {
        type: String,
        required: [true, 'please provide the quote currency']
    },
    amount: {
        type: String,
        required: [true, 'please provide the amount you are purchasing']
    },
    quotePrice: {
        type: String,
        required: [true, 'please provide the quote price']
    },
    buyer: {
        type: {
            name: String,
            id: mongodb_1.ObjectID,
            email: String
        },
        required: [true, 'please provide the buyer']
    },
    seller: {
        type: {
            name: String,
            id: mongodb_1.ObjectID,
            email: String
        },
        required: [true, 'please provide the Seller']
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    status: {
        type: String,
        default: 'pending'
    }
});
exports.transactionSchema = transactionSchema;
