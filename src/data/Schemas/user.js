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
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = __importStar(require("mongoose"));
var validator_1 = require("../validators/validator");
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'please provide a name for the user'],
        minlength: [5, 'your name cannot be less than five letters']
    },
    email: {
        type: String,
        required: [true, 'please provide an email for the user'],
        unique: true,
        validate: [validator_1.isEmail, 'please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'please provide a password for your user'],
        validate: [validator_1.isPassword, 'your password should contain a number, uppercase and lowercase letter']
    },
    phoneNumber: {
        type: Number,
        required: [true, 'please provide your phone number']
    },
    wallet: {
        type: Object
    },
    secondaryEmail: {
        type: String
    },
    displayImage: {
        type: String
    },
    country: {
        type: String
    },
    currency: {
        type: String
    },
    state: {
        type: String
    },
    trades: [],
});
exports.default = userSchema;
