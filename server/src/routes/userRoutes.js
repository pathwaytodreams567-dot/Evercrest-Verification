import express from 'express'
import { verifyToken } from '../middleware/auth.js'
import User from '../models/User.js'
import Wallet from '../models/Wallet.js'

const router = express.Router()

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    const wallet = await Wallet.findOne({ userId: req.user.id })

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    res.json({
      user,
      wallet
    })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' })
  }
})

// Update user profile
router.put('/profile', verifyToken, async (req, res) => {
  try {
    const { fullName, email, bankDetails } = req.body
    
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        fullName,
        email,
        bankDetails
      },
      { new: true }
    )

    res.json({
      message: 'Profile updated',
      user
    })
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' })
  }
})

// Get agent level info
router.get('/level-info', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
    
    const levels = {
      starter: { activation: 1000, dailyEarning: 200, tasks: 4, checkIn: 50, minWithdraw: 1000 },
      silver: { activation: 3000, dailyEarning: 700, tasks: 5, checkIn: 50, minWithdraw: 2000 },
      gold: { activation: 5000, dailyEarning: 1200, tasks: 6, checkIn: 50, minWithdraw: 3000 },
      premium: { activation: 10000, dailyEarning: 2400, tasks: 8, checkIn: 100, minWithdraw: 5000 },
      elite: { activation: 50000, dailyEarning: 12000, tasks: 10, checkIn: 500, minWithdraw: 20000 }
    }

    res.json({
      currentLevel: user.agentLevel,
      levelInfo: levels[user.agentLevel],
      allLevels: levels
    })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching level info' })
  }
})

export default router
