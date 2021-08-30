import { Schema } from "mongoose";
import { INotification } from "../../controllers/helper/interface";

const NotificationSchema:Schema<INotification> = new Schema({
  customer: {
    name: {
      type: String,
      required: [true, 'Please provide the name of the customer the notification belongs to.']
    },
    email: {
      type: String,
      required: [true, 'Please provide the email of the customer the notification belongs to.']
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please provide the phone number of the customer the notification belongs to.']
    }
  },
  customerId: {
    type: String,
    required: [true, 'Please provide the ID of the customer the notification belongs to.']
  },
  text: {
    type: String,
    required: [true, 'Please provide a text for the body of the notification.']
  },
  date: {
    type: Date,
    default: () => new Date()
  },
  isRead: {
    type: Boolean,
    default: false
  }
})

export default NotificationSchema