"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import TextAnimation from "../../../../components/uilayouts/scroll-text";

export default function TravelStory() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stories")
      .then((res) => res.json())
      .then((data) => {
        setStories(data.slice(0, 6)); // only 6
        setLoading(false); // ✅ FIXED HERE
      })
      .catch((err) => {
        console.error("API Error:", err);
        setLoading(false); // still stop loading on error
      });
  }, []);

  const isEven = (i) => i % 2 === 0;

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500">Loading stories...</div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-6 space-y-28">
      {/* HEADER */}
      <div className="text-center space-y-4">
        <TextAnimation
          text="Stories That Come Alive As You Scroll"
          classname="text-4xl md:text-6xl font-bold"
          direction="up"
        />
        <p className="text-gray-500 max-w-2xl mx-auto">
          Each destination reveals itself as you scroll — smooth, modern, and
          immersive storytelling.
        </p>
      </div>

      {/* STORIES */}
      {stories.map((item, i) => (
        <div key={item.id} className="grid md:grid-cols-2 gap-10 items-center">
          {/* TEXT */}
          <motion.div
            initial={{
              opacity: 0,
              x: isEven(i) ? -120 : 120,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.4 }}
            className={`space-y-4 ${isEven(i) ? "md:order-1" : "md:order-2"}`}
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              {item.title}
            </h2>

            <p className="text-gray-500 text-lg leading-relaxed">
              {item.content}
            </p>

            <p className="text-sm text-gray-400">
              🌍 {item.continent} • ⭐ {item.rating}/5
            </p>
          </motion.div>

          {/* IMAGE */}
          <motion.div
            initial={{
              opacity: 0,
              x: isEven(i) ? 120 : -120,
              scale: 0.95,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              scale: 1,
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.4 }}
            className={`relative h-[400px] rounded-3xl overflow-hidden shadow-xl ${
              isEven(i) ? "md:order-2" : "md:order-1"
            }`}
          >
            <Image
              src={`${item.image}?auto=format&w=1200&q=80`}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority={i < 2}
            />
          </motion.div>
        </div>
      ))}
      {/* VIEW MORE BUTTON */}
      <div className="flex justify-center pt-10">
        <motion.a
          href="/stories"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black font-medium shadow-lg hover:shadow-xl transition-all duration-300"
        >
          View More Stories →
        </motion.a>
      </div>
    </section>
  );
}
