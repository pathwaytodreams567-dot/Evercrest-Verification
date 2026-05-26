import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'How do I start earning with Evercrest?',
      answer: 'Create an account, select a plan (Starter Agent requires ₦1,000), and start completing verification tasks. You can withdraw your earnings after the unlock period.'
    },
    {
      question: 'What is the minimum withdrawal amount?',
      answer: 'Minimum withdrawal depends on your agent level. Starter: ₦1,000, Silver: ₦2,000, Gold: ₦3,000, Premium: ₦5,000, Elite VIP: ₦20,000.'
    },
    {
      question: 'How long before I can withdraw my profits?',
      answer: 'Investment capital is withdrawable after 7 days. Profit earnings require 30 full days before withdrawal.'
    },
    {
      question: 'What payment methods are available?',
      answer: 'Nigeria: Bank Transfer, Opay, PalmPay, Crypto, Gift Cards. US: Cash App, Zelle, PayPal, Crypto, Gift Cards.'
    },
    {
      question: 'How do referrals work?',
      answer: 'Share your referral link. You earn 20% commission when someone registers with your code and activates a plan.'
    },
    {
      question: 'Can I upgrade my agent level?',
      answer: 'Yes! Deposit the activation amount for your desired level to upgrade anytime.'
    },
  ]

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400">Everything you need to know about Evercrest</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="glass cursor-pointer p-4"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{faq.question}</h3>
                <FiChevronDown
                  className={`transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                />
              </div>
              {openIndex === index && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 text-gray-300"
                >
                  {faq.answer}
                </motion.p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
