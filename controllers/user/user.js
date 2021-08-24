"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editProfile = void 0;
const user_1 = __importDefault(require("../../data/models/user"));
// edit the users info
const editProfile = async (req, res) => {
    const { currency, state, country, name, phoneNumber, secondaryEmail, id } = req.body;
    // console.log(req.body)
    const user = await user_1.default.editProfile(id, { currency, state, country, name, phoneNumber, secondaryEmail });
    res.json(user);
};
exports.editProfile = editProfile;
