import express from 'express'

import userModel from '../../data/models/user'


// edit the users info
const editProfile = async (req: express.Request, res: express.Response) => {
  const { currency, state, country, name, phoneNumber, secondaryEmail, id } = req.body
  // console.log(req.body)
  const user = await userModel.editProfile(id, { currency, state, country, name, phoneNumber, secondaryEmail})
  res.json(user)
}

export { editProfile }