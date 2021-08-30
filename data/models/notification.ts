import { model } from 'mongoose'
import { INotification, NotificationModel } from '../../controllers/helper/interface'
import userModel from './user'
import NotificationSchema from '../Schemas/notification'


NotificationSchema.methods.findOwner = async function () {
  const userId = this.customerId;
  const owner = await userModel.findById(userId);
  return owner
}

NotificationSchema.methods.markAsRead = async function () {
  await this.updateOne({ isRead: true })
}



const Notifications = model<INotification, NotificationModel>('notification', NotificationSchema)

export default Notifications