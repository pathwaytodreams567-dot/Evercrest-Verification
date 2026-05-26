import mongoose from 'mongoose'

const depositSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: String,
  method: {
    type: String,
    enum: ['bank_transfer', 'opay', 'palmPay', 'moniepoint', 'cashapp', 'zelle', 'paypal', 'crypto', 'gift_card', 'wise', 'skrill'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'completed'],
    default: 'pending'
  },
  proofImages: [String],
  details: {
    accountNumber: String,
    transactionId: String,
    giftCardType: String,
    frontImage: String,
    backImage: String,
    email: String
  },
  approvedBy: String,
  approvalDate: Date,
  rejectionReason: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true })

export default mongoose.model('Deposit', depositSchema)
