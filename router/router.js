"use strict";
exports.__esModule = true;
var express_1 = require("express");
// OUR CUSTOM HANDLERS WILL BE IMPORTED HERE
var auth_cont_1 = require("../controllers/auth/auth-cont");
var router = express_1.Router();
// AUTH ROUTES
// SIGUP ROUTE AND HANDLER FUNCTION
router.post('/signup', auth_cont_1.createUserWithEmailAndPassword);
router.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.send('<h1>Hello World</h1>');
});
exports["default"] = router;
