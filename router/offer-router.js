"use strict";
exports.__esModule = true;
exports.router = void 0;
var express_1 = require("express");
var offer_1 = require("../controllers/offers/offer");
var router = express_1.Router();
exports.router = router;
router.post('/offers/create', offer_1.createOffer);
router.get('/offers', offer_1.getAllOffers);
router.get('/offers/market', function (req, res) {
    res.render('dashboard/market');
});
router.get('/offers/user/id/:id', offer_1.getOffersWithUserId);
router.post('/offers/delete/:id', offer_1.deleteOffer);
