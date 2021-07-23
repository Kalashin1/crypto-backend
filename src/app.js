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
var express = __importStar(require("express"));
var mongoose = __importStar(require("mongoose"));
var cookieParser = __importStar(require("cookie-parser"));
var path = __importStar(require("path"));
var validate_user_1 = require("./controllers/auth/validate-user");
var router_1 = require("./router/router");
var transaction_router_1 = require("./router/transaction-router");
var app = express();
var PORT = 3000;
var url = 'mongodb+srv://kalashin:Kalashin1@cluster0.4umw1.gcp.mongodb.net/crypto?retryWrites=true&w=majority';
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
app.use(express.json());
app.use(router_1.router);
app.use(transaction_router_1.router);
app.use(express.static('public'));
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(function (result) { return app.listen(process.env.PORT || PORT, function () { return console.log("app running on port " + (process.env.PORT || PORT)); }); })
    .catch(function (err) { return console.log(err); });
app.get('/user', validate_user_1.getUser);
