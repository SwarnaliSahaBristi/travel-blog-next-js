"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const destinations = [
  { id: 1, name: "Paris", image: "/images/shutterstock_2464630783-scaled.jpg" },
  { id: 2, name: "Bali", image: "/images/bali-for-digital-nomads.jpg" },
  { id: 3, name: "New York", image: "/images/caption.jpg" },
  { id: 4, name: "Tokyo", image: "/images/tokyo-for-digital-nomads.jpg" },
]

export default function PopularDestinations() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Popular Destinations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {destinations.map((dest) => (
          <Link key={dest.id} href={`/destinations/${dest.name.toLowerCase()}`}>
            <div className="relative group cursor-pointer overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
              <Image
                src={dest.image}
                alt={dest.name}
                width={400}
                height={300}
                className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
              <div className="absolute bottom-4 left-4 text-white font-semibold text-lg">
                {dest.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}