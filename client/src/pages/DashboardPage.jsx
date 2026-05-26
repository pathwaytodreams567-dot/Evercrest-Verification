import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAuthStore } from '../store/authStore'
import DashboardHome from './dashboard/DashboardHome'
import TasksPage from './dashboard/TasksPage'
import WalletPage from './dashboard/WalletPage'
import WithdrawalsPage from './dashboard/WithdrawalsPage'
import DepositPage from './dashboard/DepositPage'
import ReferralsPage from './dashboard/ReferralsPage'
import ProfilePage from './dashboard/ProfilePage'

export default function DashboardPage() {
  const { user } = useAuthStore()

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 pt-24">
      <Routes>
        <Route path="/" element={<DashboardHome />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/withdrawals" element={<WithdrawalsPage />} />
        <Route path="/deposits" element={<DepositPage />} />
        <Route path="/referrals" element={<ReferralsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  )
}
