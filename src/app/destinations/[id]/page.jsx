// app/destinations/[id]/page.jsx
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function DestinationDetails({ params }) {
  const { id } = await params
  const numericId = Number(id)

  // https://travel-blog-next-js-delta.vercel.app
  const res = await fetch("http://localhost:3000/api/destinations", { cache: "no-store" })
  const data = await res.json()

  const destination = data.find(d => d.id === numericId)

  if (!destination) {
    return (
      <div className="p-10 text-center text-red-600 font-bold text-xl">
        Destination not found
      </div>
    )
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-16 space-y-8">
      <h1 className="text-5xl font-bold text-center">{destination.name}</h1>
      <p className="text-center text-lg text-black dark:text-white">{destination.country}</p>

      <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg">
        <img src={destination.image} alt={destination.name} className="object-cover" />
      </div>

      <p className="text-black dark:text-white text-lg">{destination.description}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-black dark:text-white">
        <div>
          <p><span className="font-semibold">Rating:</span> {destination.rating} ⭐</p>
          <p><span className="font-semibold">Reviews:</span> {destination.reviews}</p>
          <p><span className="font-semibold">Best Time to Visit:</span> {destination.bestTime}</p>
        </div>

        <div>
          <p className="font-semibold mb-2">Activities:</p>
          <div className="flex flex-wrap gap-2">
            {destination.activities.map((act, i) => (
              <span key={i} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm">{act}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4 justify-center mt-8">
        <Link href="/destinations">
          <Button variant="outline">Back to Destinations</Button>
        </Link>
        <Button>Plan Your Trip</Button>
      </div>
    </section>
  )
}