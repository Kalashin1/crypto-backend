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
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const mongoose = __importStar(require("mongoose"));
const cookieParser = __importStar(require("cookie-parser"));
const path = __importStar(require("path"));
const cors = __importStar(require("cors"));
const validate_user_1 = require("./controllers/auth/validate-user");
// OUR CUSTOM IMPORTS WILL SIT HERE
// IMPORTING OUR DIFF ROUTERS
const router_1 = require("./router/router");
// IMPORTING TRANSACTION ROUTER
const transaction_router_1 = require("./router/transaction-router");
// CREATING OUR SEVER APP WITH EXPRESS
const app = express();
// OUR APP WILL RUN ON THE PORT GIVEN BELOW
const PORT = 3000;
// THIS STRING IS THE LINK TO OUR MONGODB
// const url = 'mongodb://localhost:27017/crypto' //
const url = 'mongodb+srv://kalashin:Kalashin1@cluster0.4umw1.gcp.mongodb.net/crypto?retryWrites=true&w=majority';
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const corsOptions = {
    origin: ['https://legatoex-zp4banx7ka-uc.a.run.app', 'http://localhost:3000'],
    credentials: true,
    exposedHeaders: ['set-cookie']
};
// MIDDLEWARES
app.use(cors(corsOptions));
//  COOKIE PARSER
app.use(cookieParser());
// JSON PARSER
app.use(express.json());
// AUTH ROUTER
app.use(router_1.router);
// TRANSACTION ROUTER
app.use(transaction_router_1.router);
// PUBLIC FOLDER
app.use(express.static('public'));
// routes
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(result => app.listen(process.env.PORT || PORT, () => console.log(`app running on port ${process.env.PORT || PORT}`)))
    .catch(err => console.log(err));
app.get('/user', validate_user_1.getUser);
