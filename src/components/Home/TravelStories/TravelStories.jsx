"use client"

import Image from "next/image"
import Link from "next/link"

const stories = [
  { id: 1, title: "A Week in Paris", image: "/images/shutterstock_2464630783-scaled.jpg" },
  { id: 2, title: "Bali Adventures", image: "/images/bali-for-digital-nomads.jpg" },
  { id: 3, title: "New York City Vibes", image: "/images/caption.jpg" },
  { id: 4, title: "Tokyo Highlights", image: "/images/tokyo-for-digital-nomads.jpg" },
]

export default function TravelStories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Travel Stories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {stories.map((story) => (
          <Link key={story.id} href={`/stories/${story.title.toLowerCase().replace(/ /g, "-")}`}>
            <div className="group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <Image
                src={story.image}
                alt={story.title}
                width={400}
                height={300}
                className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="p-4 bg-white dark:bg-gray-800">
                <h3 className="font-semibold text-lg">{story.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}