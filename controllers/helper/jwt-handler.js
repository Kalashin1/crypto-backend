"use strict";
exports.__esModule = true;
exports.createToken = exports.maxAge = void 0;
var jwt = require("jsonwebtoken");
var maxAge = 3 * 24 * 60 * 60;
exports.maxAge = maxAge;
var createToken = function (id) {
    return jwt.sign({ id: id }, 'my secrete key', {
        expiresIn: 3 * 24 * 60 * 60
    });
};
exports.createToken = createToken;
