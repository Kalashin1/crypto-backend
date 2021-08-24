"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUserWithEmailAndPassword = exports.createUserWithEmailAndPassword = void 0;
// IMPORTING USER MODEL TO CREATE A USER
const user_1 = __importDefault(require("../../data/models/user"));
const jwt_handler_1 = require("../helper/jwt-handler");
const error_handler_1 = __importDefault(require("../helper/error-handler"));
// CREATING A NEW USER
const createUserWithEmailAndPassword = async (req, res) => {
    const { name, email, password, phoneNumber } = req.body;
    console.log(req.body);
    try {
        // IF THE USER IS CREATED SUCCESSFULLY CREATE A JWT WITH THEIR ID
        const user = await user_1.default.create({ name, email, password, phoneNumber });
        // CREATE A COOKIE TO HOLD THE JWT
        const token = jwt_handler_1.createToken(user._id);
        // send the cookie back to the user agent
        res.cookie('jwt', token, { httpOnly: true, maxAge: jwt_handler_1.maxAge * 1000 }); // in production add secure:true
        res.status(200).json(user);
    }
    catch (err) {
        console.log(err); // handles the error if ther is an error
        let errors = error_handler_1.default(err); // send back the handled error to the frontend
        res.status(400).json(errors);
    }
};
exports.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
// Login a user
const loginUserWithEmailAndPassword = async (req, res) => {
    const { email, password } = req.body; // retrieve email and password
    console.log(req.body);
    try {
        const user = await user_1.default.login(email, password); // login with email and password
        const token = jwt_handler_1.createToken(user._id); // create a token for that user
        res.cookie('jwt', token, { httpOnly: true, maxAge: jwt_handler_1.maxAge * 1000 }); // create a cookie to hold the jwt
        res.status(200).end(JSON.stringify(user));
    }
    catch (err) {
        console.log(err);
        const errors = error_handler_1.default(err);
        res.status(400).json(errors);
    }
};
exports.loginUserWithEmailAndPassword = loginUserWithEmailAndPassword;
const logoutUser = async (req, res) => {
    if (typeof req.cookies.jwt !== undefined) { // if cookie with the value of jwt exists
        // res.cookie('jwt', '', {maxAge: 1}) // delete the cookie
        res.clearCookie('jwt');
        res.json({ message: 'logout successfull' }); // send the user a logout successfull message
    }
    else {
        res.json({ message: 'you are not logged in' }); // notify the user that they are not logged in
    }
};
exports.logoutUser = logoutUser;
