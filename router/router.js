"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
// OUR CUSTOM HANDLERS WILL BE IMPORTED HERE
const auth_cont_1 = require("../controllers/auth/auth-cont");
const user_1 = require("../controllers/user/user");
const router = express_1.Router();
exports.router = router;
// AUTH ROUTES
// SIGUP ROUTE AND HANDLER FUNCTION
router.post('/signup', async (req, res) => {
    await auth_cont_1.createUserWithEmailAndPassword(req, res);
});
// login route and handler function
router.post('/login', async (req, res) => {
    await auth_cont_1.loginUserWithEmailAndPassword(req, res);
});
//logout route and handler function
router.get('/logout', auth_cont_1.logoutUser);
router.get('/', (_req, res) => {
    console.log('connected');
    res.json({ message: 'connected' });
});
router.post('/dashboard/profile', user_1.editProfile);
