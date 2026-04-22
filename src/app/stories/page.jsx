"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import TextAnimation from "../../../components/uilayouts/scroll-text";

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function TravelStories() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* =========================
     FETCH FROM API
  ========================= */
  useEffect(() => {
    fetch("/api/stories")
      .then((res) => res.json())
      .then((data) => {
        setStories(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load stories");
        setLoading(false);
      });
  }, []);

  /* =========================
     LOADING STATE
  ========================= */
  if (loading) {
    return (
      <section className="text-center py-20 text-gray-500">
        Loading stories...
      </section>
    );
  }

  /* =========================
     ERROR STATE
  ========================= */
  if (error) {
    return (
      <section className="text-center py-20 text-red-500">
        {error}
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 space-y-12">

      {/* HEADER */}
      <div className="text-center space-y-3">
        <TextAnimation
          text="✈️ Travel Stories"
          classname="text-4xl md:text-6xl font-bold"
          direction="up"
        />
        <p className="text-gray-500 max-w-2xl mx-auto">
          Explore real experiences from around the world — beautifully captured.
        </p>
      </div>

      {/* GRID */}
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >

        {/* FEATURED CARD */}
        {stories[0] && (
          <motion.div
            variants={item}
            className="md:col-span-2 row-span-2 relative group rounded-3xl overflow-hidden shadow-2xl"
          >
            <Link
              href={`/stories/${stories[0].title
                .toLowerCase()
                .replace(/ /g, "-")}`}
            >
              <div className="relative h-[420px] md:h-full">
                <Image
                  src={stories[0].image}
                  alt={stories[0].title}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-3xl font-bold">
                    {stories[0].title}
                  </h3>
                  <p className="text-sm text-gray-300">
                    Featured Story
                  </p>
                </div>
              </div>
            </Link>
          </motion.div>
        )}

        {/* SMALL CARDS */}
        {stories.slice(1, 4).map((story) => (
          <motion.div
            key={story.id}
            variants={item}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative group rounded-2xl overflow-hidden shadow-lg"
          >
            <Link
              href={`/stories/${story.title
                .toLowerCase()
                .replace(/ /g, "-")}`}
            >
              <div className="relative h-52">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover group-hover:scale-110 transition duration-700"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-semibold">
                    {story.title}
                  </h3>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}

      </motion.div>
    </section>
  );
}