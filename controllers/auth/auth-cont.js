"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.logoutUser = exports.loginUserWithEmailAndPassword = exports.createUserWithEmailAndPassword = void 0;
// IMPORTING USER MODEL TO CREATE A USER
var user_1 = require("../../data/models/user");
var jwt_handler_1 = require("../helper/jwt-handler");
var error_handler_1 = require("../helper/error-handler");
// CREATING A NEW USER
var createUserWithEmailAndPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name, email, password, phoneNumber, user, token, err_1, errors;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body, name = _a.name, email = _a.email, password = _a.password, phoneNumber = _a.phoneNumber;
                console.log(req.body);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1["default"].create({ name: name, email: email, password: password, phoneNumber: phoneNumber })
                    // CREATE A COOKIE TO HOLD THE JWT
                ];
            case 2:
                user = _b.sent();
                token = jwt_handler_1.createToken(user._id);
                // send the cookie back to the user agent
                res.status(200).json({ token: token });
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                console.log(err_1); // handles the error if ther is an error
                errors = error_handler_1["default"](err_1) // send back the handled error to the frontend
                ;
                res.status(400).json(errors);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.createUserWithEmailAndPassword = createUserWithEmailAndPassword;
// Login a user
var loginUserWithEmailAndPassword = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, user, token, err_2, errors;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = req.body // retrieve email and password
                , email = _a.email, password = _a.password;
                console.log(req.body);
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, user_1["default"].login(email, password)]; // login with email and password
            case 2:
                user = _b.sent() // login with email and password
                ;
                token = jwt_handler_1.createToken(user._id) // create a token for that user
                ;
                res.status(200).json({ token: token }); // send back the token
                return [3 /*break*/, 4];
            case 3:
                err_2 = _b.sent();
                console.log(err_2);
                errors = error_handler_1["default"](err_2);
                res.status(400).json(errors);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.loginUserWithEmailAndPassword = loginUserWithEmailAndPassword;
var logoutUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (typeof req.headers.token !== undefined) { // if cookie with the value of jwt exists
            // res.cookie('jwt', '', {maxAge: 1}) // delete the cookie
            delete req.headers.token;
            res.json({ message: 'logout successfull' }); // send the user a logout successfull message
        }
        else {
            res.json({ message: 'you are not logged in' }); // notify the user that they are not logged in
        }
        return [2 /*return*/];
    });
}); };
exports.logoutUser = logoutUser;
