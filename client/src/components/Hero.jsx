import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 pt-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-gray-300 to-blue-400 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Trusted Tasks. Real Opportunities.
        </motion.h1>

        <motion.p
          className="text-lg md:text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Join Evercrest Verification Nigeria and earn real money by completing product verification tasks from top online stores.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <Link
            to="/register"
            className="px-8 py-4 bg-gradient-primary text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/50 transition"
          >
            Start Earning <FiArrowRight />
          </Link>
          <Link
            to="/login"
            className="px-8 py-4 glass-lg text-white rounded-lg font-semibold hover:border-blue-400 transition"
          >
            Login to Dashboard
          </Link>
        </motion.div>

        {/* Feature badges */}
        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {['Instant Verification', 'Secure Payments', 'Multiple Countries', '24/7 Support'].map((badge, i) => (
            <div key={i} className="glass px-4 py-2 rounded-full text-sm text-gray-300">
              ✓ {badge}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
