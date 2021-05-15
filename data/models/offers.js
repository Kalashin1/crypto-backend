"use strict";
exports.__esModule = true;
exports.offerModel = void 0;
var mongoose_1 = require("mongoose");
var offer_1 = require("../Schemas/offer");
var offerModel = mongoose_1.model('offer', offer_1.offerSchema);
exports.offerModel = offerModel;
