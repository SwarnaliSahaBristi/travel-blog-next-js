"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Destinations() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState("")
  const [country, setCountry] = useState("All")
  const [favorites, setFavorites] = useState([])
  const [page, setPage] = useState(1)

  const itemsPerPage = 8

  useEffect(() => {
    fetch("/api/destinations")
      .then(res => res.json())
      .then(setData)
  }, [])

  // Favorite toggle
  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id)
        ? prev.filter(f => f !== id)
        : [...prev, id]
    )
  }

  // Filter logic
  const filtered = data.filter(dest =>
    dest.name.toLowerCase().includes(search.toLowerCase()) &&
    (country === "All" || dest.country === country)
  )

  // Pagination logic
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const start = (page - 1) * itemsPerPage
  const currentData = filtered.slice(start, start + itemsPerPage)

  // Unique countries
  const countries = ["All", ...new Set(data.map(d => d.country))]

  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-4xl font-bold">Explore Destinations</h2>
        <p className="text-gray-500 mt-2">
          Discover beautiful places around the world
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col md:flex-row gap-4 justify-between mb-10">

        {/* Search */}
        <input
          type="text"
          placeholder="Search destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-1/3"
        />

        {/* Country Filter */}
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-1/4 text-black dark:text-white dark:bg-black"
        >
          {countries.map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>

      </div>

      {/* Destinations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">

        {currentData.map(dest => (
          <div
            key={dest.id}
            className="rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-white dark:bg-gray-900"
          >

            <div className="relative w-full h-48">

              <img
                src={dest.image}
                alt={dest.name}
                className="object-cover"
              />

              {/* Favorite Button */}
              <button
                onClick={() => toggleFavorite(dest.id)}
                className="absolute top-3 right-3 bg-white p-2 rounded-full shadow"
              >
                <Heart
                  size={18}
                  className={
                    favorites.includes(dest.id)
                      ? "text-red-500 fill-red-500"
                      : "text-gray-500"
                  }
                />
              </button>

            </div>

            <div className="p-4 text-center">

              <h3 className="font-semibold text-lg">
                {dest.name}
              </h3>

              <p className="text-sm text-gray-500">
                {dest.country}
              </p>

              <div className="flex gap-2 mt-4 justify-center">

                <Button size="sm" asChild>
                  <Link href={`/destinations/${dest.id}`}>
                    View Details
                  </Link>
                </Button>

              </div>

            </div>

          </div>
        ))}

      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-10">

        {Array.from({ length: totalPages }).map((_, i) => (

          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded-md border ${
              page === i + 1
                ? "bg-black text-white"
                : "bg-white"
            }`}
          >
            {i + 1}
          </button>

        ))}

      </div>

    </section>
  )
}