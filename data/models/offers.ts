import { model } from 'mongoose'

import { Offer, offerModel as offerModelInterface } from '../../controllers/helper/interface'

import { offerSchema } from '../Schemas/offer'

const offerModel = model<Offer, offerModelInterface>('offer', offerSchema)

export { offerModel } 