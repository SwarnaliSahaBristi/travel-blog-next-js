"use client"

import { Bookmark, Globe, Mountain, Sun } from "lucide-react"

const categories = [
  { id: 1, name: "Adventure", icon: Mountain },
  { id: 2, name: "Beaches", icon: Sun },
  { id: 3, name: "City Tours", icon: Globe },
  { id: 4, name: "Cultural", icon: Bookmark },
]

export default function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold mb-8 text-center">Explore by Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((cat) => {
          const Icon = cat.icon
          return (
            <div
              key={cat.id}
              className="flex flex-col items-center justify-center gap-2 p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer text-center"
            >
              <Icon className="w-8 h-8 text-primary mb-2" />
              <span className="font-semibold">{cat.name}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}