import * as express from "express";
import { Router } from "express";

import {
  createOffer,
  getAllOffers,
  deleteOffer,
  getOffersWithUserId,
} from "../controllers/offers/offer";

const router = Router();

router.post("/offers/create", createOffer);

router.get("/offers", getAllOffers);

router.get("/offers/market", (req: express.Request, res: express.Response) => {
  res.render("dashboard/market");
});

router.get("/offers/user/id/:id", getOffersWithUserId);

router.post("/offers/delete/:id", deleteOffer);

export { router };
