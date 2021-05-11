import express from 'express'

import userModel from '../../data/models/user'

const createOffer = async (req: express.Request, res: express.Response) => {
  const { min, max, accepting, exchanging, quote, id } = req.body
  const offerObj = { min, max, accepting, exchanging, quote}
  const offer = await userModel.createOffer(id, offerObj)
  res.json(offer)
}

export { createOffer }