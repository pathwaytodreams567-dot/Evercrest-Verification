import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  adminId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin'
  },
  type: {
    type: String,
    enum: ['deposit', 'withdrawal', 'task_reward', 'referral', 'plan_activation', 'withdrawal_unlock'],
    required: true
  },
  title: String,
  message: String,
  relatedId: String,
  isRead: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true })

export default mongoose.model('Notification', notificationSchema)
