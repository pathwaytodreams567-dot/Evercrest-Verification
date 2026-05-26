import React, { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import MobilePhoneInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const refCode = searchParams.get('ref') || ''

  const [formData, setFormData] = useState({
    fullName: '',
    country: 'NG',
    phone: '',
    password: '',
    confirmPassword: '',
    inviteCode: refCode,
  })

  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handlePhoneChange = (isValid, value, data) => {
    setFormData(prev => ({
      ...prev,
      phone: value,
      country: data?.countryCode?.toUpperCase() || prev.country
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.fullName.trim()) {
      toast.error('Full name is required')
      return
    }

    if (!formData.phone.trim()) {
      toast.error('Phone number is required')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (!formData.inviteCode.trim()) {
      toast.error('Invite code is required')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post('/api/auth/register', {
        fullName: formData.fullName,
        country: formData.country,
        phone: formData.phone,
        password: formData.password,
        inviteCode: formData.inviteCode,
      })

      localStorage.setItem('token', response.data.token)
      toast.success('Registration successful!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center px-4 pt-24 pb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-lg p-8 rounded-2xl">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Create Account</h1>
            <p className="text-gray-400">Join Evercrest today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full bg-slate-800/50 border border-blue-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Country</label>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full bg-slate-800/50 border border-blue-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
              >
                <option value="NG">Nigeria 🇳🇬</option>
                <option value="US">United States 🇺🇸</option>
                <option value="GB">United Kingdom 🇬🇧</option>
                <option value="CA">Canada 🇨🇦</option>
                <option value="AU">Australia 🇦🇺</option>
                <option value="GH">Ghana 🇬🇭</option>
                <option value="KE">Kenya 🇰🇪</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <MobilePhoneInput
                defaultCountry={formData.country.toLowerCase()}
                value={formData.phone}
                onPhoneNumberChange={handlePhoneChange}
                preferredCountries={['ng', 'us', 'gb']}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-slate-800/50 border border-blue-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                placeholder="Minimum 6 characters"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-slate-800/50 border border-blue-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                placeholder="Re-enter your password"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Invite Code</label>
              <input
                type="text"
                name="inviteCode"
                value={formData.inviteCode}
                onChange={handleChange}
                className="w-full bg-slate-800/50 border border-blue-500/30 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                placeholder="Enter your invite code"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-gradient-primary text-white font-semibold py-2 rounded-lg hover:shadow-lg hover:shadow-blue-500/50 transition disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center mt-6 text-gray-400">
            Already have an account?{' '}
            <a href="/login" className="text-blue-400 hover:text-blue-300">
              Login here
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
