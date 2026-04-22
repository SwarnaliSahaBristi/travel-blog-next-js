"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import TextAnimation from "../../../components/uilayouts/scroll-text";

/* =========================
   ✨ ANIMATION VARIANTS
========================= */
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Destinations() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [country, setCountry] = useState("All");
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);

  const itemsPerPage = 8;

  useEffect(() => {
    fetch("/api/destinations")
      .then((res) => res.json())
      .then(setData);
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const filtered = data.filter(
    (dest) =>
      dest.name.toLowerCase().includes(search.toLowerCase()) &&
      (country === "All" || dest.country === country),
  );

  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const currentData = filtered.slice(start, start + itemsPerPage);

  const countries = ["All", ...new Set(data.map((d) => d.country))];

  return (
    <section className="max-w-7xl mx-auto px-6 py-16 space-y-12">
      {/* =========================
          ANIMATED HEADING
      ========================= */}
      <div className="text-center space-y-4">
        <TextAnimation
          text="Explore Destinations"
          classname="text-4xl md:text-6xl font-bold"
          direction="up"
        />

        <TextAnimation
          text="Discover beautiful places around the world"
          classname="text-gray-500 max-w-2xl mx-auto"
          direction="up"
        />
      </div>

      {/* =========================
          SEARCH + FILTER
      ========================= */}
      <div className="flex flex-col md:flex-row gap-4 justify-between">
        <input
          type="text"
          placeholder="Search destination..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-1/3"
        />

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="border rounded-lg px-4 py-2 w-full md:w-1/4 text-black dark:text-white dark:bg-black"
        >
          {countries.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* =========================
          ANIMATED GRID
      ========================= */}
      <motion.div
        key={`${page}-${country}-${search}`}
        variants={container}
        initial="hidden"
        whileInView="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8"
      >
        {currentData.map((dest) => (
          <motion.div
            layout
            key={dest.id}
            variants={card}
            whileHover={{ y: -10 }}
            className="group relative rounded-3xl overflow-hidden bg-white dark:bg-gray-900 shadow-md hover:shadow-2xl transition-all duration-300"
          >
            {/* IMAGE */}
            <div className="relative w-full h-56 overflow-hidden">
              <img
                src={dest.image}
                alt={dest.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Favorite */}
              <button
                onClick={() => toggleFavorite(dest.id)}
                className="absolute top-3 right-3 bg-white/90 dark:bg-black/60 p-2 rounded-full backdrop-blur-md shadow-md hover:scale-110 transition"
              >
                <Heart
                  size={18}
                  className={
                    favorites.includes(dest.id)
                      ? "text-red-500 fill-red-500"
                      : "text-gray-600"
                  }
                />
              </button>
            </div>

            {/* CONTENT */}
            <div className="p-5 space-y-2 text-center">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition">
                {dest.name}
              </h3>

              <p className="text-sm text-gray-500">{dest.country}</p>

              <span className="inline-block mt-3 text-sm font-medium text-blue-500 group-hover:underline">
                Explore →
              </span>
            </div>

            <div className="absolute inset-0 rounded-3xl ring-1 ring-transparent group-hover:ring-blue-400/40 transition" />
          </motion.div>
        ))}
      </motion.div>

      {/* =========================
          PAGINATION
      ========================= */}
      <div className="flex justify-center gap-2 mt-10">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-4 py-2 rounded-md border transition ${
              page === i + 1 ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
}
