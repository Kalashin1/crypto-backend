"use strict";
exports.__esModule = true;
exports.web3 = void 0;
var Web3 = require("web3");
var url = 'https://kovan.infura.io/v3/b96ec2452bf040789706d7e4a53be119';
var mainNet = 'https://mainnet.infura.io/v3/b96ec2452bf040789706d7e4a53be119';
var web3 = new Web3(mainNet);
exports.web3 = web3;
