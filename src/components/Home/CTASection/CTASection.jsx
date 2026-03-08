"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function CTASection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Subscribed:", email)
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 text-center bg-primary text-white rounded-xl">
      <h2 className="text-3xl font-bold mb-4">Stay Updated with TravelStory</h2>
      <p className="mb-6">Subscribe to our newsletter for latest travel tips, stories, and deals.</p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto"
      >
        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-3 rounded-lg text-black w-full sm:flex-1 focus:outline-none focus:ring-2 focus:ring-white/80 focus:ring-offset-2 transition"
        />
        <Button type="submit">Subscribe</Button>
      </form>
    </section>
  )
}