"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import TextAnimation from "../../../../components/uilayouts/scroll-text";

/* =========================
   ✨ ANIMATION VARIANTS
========================= */
const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15, // 👈 one by one effect
    },
  },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function PopularDestinations() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH DATA
  ========================= */
  useEffect(() => {
    fetch("/api/destinations")
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-6 py-28 space-y-16">
      {/* =========================
          TITLE
      ========================= */}
      <div className="text-center space-y-6">
        <TextAnimation
          text="Popular Destinations"
          classname="text-4xl md:text-6xl font-bold"
          direction="up"
        />

        <TextAnimation
          text="Explore hand-picked destinations loved by travelers around the world."
          classname="text-lg text-gray-500 max-w-2xl mx-auto"
          direction="up"
        />
      </div>

      {/* =========================
          LOADING
      ========================= */}
      {loading ? (
        <p className="text-center text-gray-500">Loading destinations...</p>
      ) : (
        <>
          {/* =========================
              GRID WITH STAGGER
          ========================= */}
          <motion.div
            key="destinations-grid"
            variants={container}
            initial="hidden"
            whileInView="show"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          >
            {data.slice(0, 6).map((dest) => (
              <motion.div
                key={dest.id}
                variants={card}
                whileHover={{ y: -10 }}
                className="group relative rounded-3xl overflow-hidden bg-white dark:bg-gray-900 shadow-md hover:shadow-2xl transition-all"
              >
                <Link href={`/destinations/${dest.id}`}>
                  {/* IMAGE */}
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={dest.image}
                      alt={dest.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition" />
                  </div>

                  {/* CONTENT */}
                  <div className="p-5 space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white group-hover:text-blue-500 transition">
                      {dest.name}
                    </h3>

                    <p className="text-sm text-gray-500 line-clamp-2">
                      {dest.description}
                    </p>

                    <span className="inline-block mt-3 text-sm font-medium text-blue-500 group-hover:underline">
                      Explore →
                    </span>
                  </div>

                  <div className="absolute inset-0 rounded-3xl ring-1 ring-transparent group-hover:ring-blue-400/40 transition" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {/* =========================
              BUTTON
          ========================= */}
          <div className="flex justify-center mt-12">
            <Link
              href="/destinations"
              className="px-8 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black font-medium hover:scale-105 transition"
            >
              Explore More →
            </Link>
          </div>
        </>
      )}
    </section>
  );
} 