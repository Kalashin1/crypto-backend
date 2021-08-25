"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.offerSchema = void 0;
var mongoose_1 = require("mongoose");
var mongodb_1 = require("mongodb");
var offerSchema = new mongoose_1.Schema({
    accepting: {
        type: String,
        required: [true, 'please provide a currency or token']
    },
    exchanging: {
        type: String,
        required: [true, 'please provide a currency or token']
    },
    min: {
        type: Number,
        required: [true, 'provide your min exchnage amount']
    },
    max: {
        type: Number,
        required: [true, 'provide your max exchange amount']
    },
    quote: {
        type: String,
        required: [true, 'provide your max exchange amount']
    },
    owner: {
        name: String,
        email: String,
        id: mongodb_1.ObjectID,
        phoneNumber: Number
    }
});
exports.offerSchema = offerSchema;
