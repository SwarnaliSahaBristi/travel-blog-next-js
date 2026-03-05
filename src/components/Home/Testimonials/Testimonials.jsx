"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const testimonials = [
  { id: 1, name: "Alice", text: "Amazing experience! Highly recommended." },
  { id: 2, name: "Bob", text: "TravelStory made planning my trip so easy." },
  { id: 3, name: "Charlie", text: "I discovered hidden gems thanks to TravelStory." },
]

export default function Testimonials() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null // avoids hydration errors

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-3xl font-bold mb-12 text-center">What Travelers Say</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.id}
            className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl transition-shadow duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: i * 0.2, duration: 0.6, type: "spring" }}
          >
            <p className="mb-4 text-gray-700 dark:text-gray-200">{t.text}</p>
            <span className="font-semibold text-gray-900 dark:text-white">— {t.name}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}