"use strict";
exports.__esModule = true;
var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var validate_user_1 = require("./controllers/auth/validate-user");
// OUR CUSTOM IMPORTS WILL SIT HERE
// IMPORTING OUR DIFF ROUTERS
var router_1 = require("./router/router");
// CREATING OUR SEVER APP WITH EXPRESS
var app = express();
// OUR APP WILL RUN ON THE PORT GIVEN BELOW
var PORT = 3000;
// THIS STRING IS THE LINK TO OUR MONGODB
// const url = 'mongodb://localhost:27017/crypto' A%24L6cMmVN%23ndqd%21
var url = 'mongodb+srv://kalashin:Kalashin1@cluster0.4umw1.gcp.mongodb.net/crypto?retryWrites=true&w=majority';
var corsOptions = {
    origin: '*',
    credentials: true,
    exposedHeaders: ['set-cookie']
};
// MIDDLEWARES
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(express.json());
app.use(router_1["default"]);
// routes
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then(function (result) { return app.listen(process.env.PORT || PORT, function () { return console.log("app running on port " + (process.env.PORT || PORT)); }); })["catch"](function (err) { return console.log(err); });
app.get('/user', validate_user_1.getUser);
