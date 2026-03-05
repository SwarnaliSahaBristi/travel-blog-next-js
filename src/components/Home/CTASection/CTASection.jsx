"use client"

import { Button } from "@/components/ui/button"

export default function CTASection() {
  return (
    <section className="relative max-w-7xl mx-auto px-6 py-16 text-center bg-gradient-to-r from-primary/90 to-primary/70 text-white rounded-2xl shadow-lg overflow-hidden">
      
      {/* Decorative background circles */}
      <div className="absolute -top-16 -left-16 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      
      {/* Content */}
      <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
        Stay Updated with TravelStory
      </h2>
      <p className="text-lg sm:text-xl mb-6">
        Subscribe to our newsletter for the latest travel tips, stories, and exclusive deals.
      </p>
      
      {/* Form */}
      <form className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Your email address"
          className="px-4 py-3 rounded-lg text-black w-full sm:flex-1 focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 transition"
        />
        <Button
          type="submit"
          size="lg"
          className="bg-white text-primary hover:bg-white/90 text-lg transition shadow-md"
        >
          Subscribe
        </Button>
      </form>
      
      {/* Small note */}
      <p className="mt-4 text-sm text-white/80">
        We respect your privacy. No spam, unsubscribe anytime.
      </p>
    </section>
  )
}