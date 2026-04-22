"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

const stories = [
  { id: 1, title: "A Week in Paris", image: "/images/shutterstock_2464630783-scaled.jpg" },
  { id: 2, title: "Bali Adventures", image: "/images/bali-for-digital-nomads.jpg" },
  { id: 3, title: "New York City Vibes", image: "/images/caption.jpg" },
  { id: 4, title: "Tokyo Highlights", image: "/images/tokyo-for-digital-nomads.jpg" },
]

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const card = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

export default function TravelStories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <h2 className="text-4xl font-bold mb-10 text-center">
        ✈️ Travel Stories
      </h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
      >
        {stories.map((story) => (
          <Link
            key={story.id}
            href={`/stories/${story.title.toLowerCase().replace(/ /g, "-")}`}
          >
            <motion.div
              variants={card}
              whileHover={{ y: -10, scale: 1.03 }}
              className="group relative overflow-hidden rounded-2xl shadow-lg bg-white dark:bg-gray-900 cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-70 group-hover:opacity-90 transition" />
              </div>

              {/* Text */}
              <div className="p-4 relative">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition">
                  {story.title}
                </h3>
              </div>

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-blue-400/40 transition" />
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </section>
  )
}