"use strict";
exports.__esModule = true;
exports.router = void 0;
var express_1 = require("express");
// OUR CUSTOM HANDLERS WILL BE IMPORTED HERE
var auth_cont_1 = require("../controllers/auth/auth-cont");
var router = express_1.Router();
exports.router = router;
// AUTH ROUTES
// SIGUP ROUTE AND HANDLER FUNCTION
router.post('/signup', auth_cont_1.createUserWithEmailAndPassword);
// login route and handler function
router.post('/login', auth_cont_1.loginUserWithEmailAndPassword);
//logout route and handler function
router.get('/logout', auth_cont_1.logoutUser);
router.get('/', function (req, res) {
    console.log('connected');
    res.setHeader('Content-Type', 'text/html');
    res.send('<h1>Hello World</h1>');
});
