import express from 'express'



import { offerModel } from '../../data/models/offers'

const createOffer = async (req: express.Request, res: express.Response) => {
  const offerObj = req.body
  try{
    const offer = await offerModel.create(offerObj)
    res.json(offer)
  }
  catch (err) {
    console.log(err)
  }
}

const getAllOffers = async (req: express.Request, res: express.Response) => {
  const offers = await offerModel.find({})
  res.json(offers)
}

const getOffersWithUserId = async (req: express.Request, res: express.Response) => {
  const id = req.params.id
  console.log(id)
  try{
    let offers = await offerModel.find()
    offers = offers.filter(offer => offer.owner.id == id)
    console.log(offers)
    res.status(200).json(offers)
  }
  catch (err) {
    console.log(err)
    res.status(400).json({ meesage: err.message})
  }
}

const deleteOffer = async (req: express.Request, res: express.Response) => {
  const  { _id } = req.params

  try{
    const deletedOffer = await offerModel.findOneAndDelete({ _id })
    const statusMessage = 'successful'
    res.status(200).json({ statusMessage, deletedOffer })
  }
  catch (err) {
    console.log(err)
    const statusMessage = 'failed'
    res.status(400).json({ statusMessage, errMessage: err.message })
  }
}

export { createOffer, getAllOffers, deleteOffer, getOffersWithUserId }