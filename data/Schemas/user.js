"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
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
    state: {
        type: String
    },
    offers: []
});
exports["default"] = userSchema;
