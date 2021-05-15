import express from 'express'

import userModel from '../../data/models/user'


// create an offer for the user
const createOffer = async (req: express.Request, res: express.Response) => {
  const { min, max, accepting, exchanging, quote, id } = req.body
  console.log(req.body)
  const offerObj = { min, max, accepting, exchanging, quote}
  const offer = await userModel.createOffer(id, offerObj)
  res.json(offer)
}

// edit the users info
const editProfile = async (req: express.Request, res: express.Response) => {
  const { address, state, country, name, phoneNumber, secondaryEmail, id } = req.body
  // console.log(req.body)
  const user = await userModel.editProfile(id, { address, state, country, name, phoneNumber, secondaryEmail})
  res.json(user)
}

export { createOffer, editProfile }