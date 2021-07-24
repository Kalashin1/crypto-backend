"use strict";
exports.__esModule = true;
var express = require("express");
var mongoose = require("mongoose");
var cookieParser = require("cookie-parser");
var path = require("path");
var cors = require("cors");
var validate_user_1 = require("./controllers/auth/validate-user");
// OUR CUSTOM IMPORTS WILL SIT HERE
// IMPORTING OUR DIFF ROUTERS
var router_1 = require("./router/router");
// IMPORTING TRANSACTION ROUTER
var transaction_router_1 = require("./router/transaction-router");
// CREATING OUR SEVER APP WITH EXPRESS
var app = express();
// OUR APP WILL RUN ON THE PORT GIVEN BELOW
var PORT = 3000;
// THIS STRING IS THE LINK TO OUR MONGODB
// const url = 'mongodb://localhost:27017/crypto' //
var url = 'mongodb+srv://kalashin:Kalashin1@cluster0.4umw1.gcp.mongodb.net/crypto?retryWrites=true&w=majority';
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
var corsOptions = {
    origin: '*',
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
    .then(function (result) { return app.listen(process.env.PORT || PORT, function () { return console.log("app running on port " + (process.env.PORT || PORT)); }); })["catch"](function (err) { return console.log(err); });
app.get('/user', validate_user_1.getUser);
