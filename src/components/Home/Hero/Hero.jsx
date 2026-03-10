"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

// Sample data for image carousel
const slides = [
  { id: 1, image: "/images/shutterstock_2464630783-scaled.jpg", alt: "Paris" },
  { id: 2, image: "/images/bali-for-digital-nomads.jpg", alt: "Bali" },
  { id: 3, image: "/images/caption.jpg", alt: "New York" },
]

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Automatic slide change every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative w-full h-[80vh] overflow-hidden">
      {/* Carousel */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill  
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
      ))}

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-6 z-20 text-white">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          Explore the World with TravelStory
        </h1>
        <p className="text-lg sm:text-xl mb-6">
          Discover amazing destinations, share your stories, and plan unforgettable trips.
        </p>
        <div className="flex gap-4 mb-8">
          <Link href="/explore">
            <Button size="lg">Start Exploring</Button>
          </Link>
          <Link href="/stories">
            <Button variant="outline" className='text-black dark:text-white dark:bg-black' size="lg">Read Stories</Button>
          </Link>
        </div>

        {/* Dynamic Statistics */}
        <div className="flex gap-8 text-white/90 text-sm sm:text-base">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">120+</span>
            <span>Destinations</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">500+</span>
            <span>Travel Stories</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold">50k+</span>
            <span>Happy Travelers</span>
          </div>
        </div>
      </div>
    </section>
  )
}