"use client";

import { motion } from "framer-motion";
import {
  Map,
  Globe,
  Compass,
  Mail,
  Star,
  Camera,
  Mountain,
} from "lucide-react";
import TextAnimation from "../../../components/uilayouts/scroll-text";

/* =========================
   STATIC GALLERY IMAGES
========================= */
const images = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
];

/* =========================
   MARQUEE FEATURES DATA
========================= */
const features = [
  {
    icon: Globe,
    title: "Explore Destinations",
    desc: "Discover places worldwide with real travel insights.",
  },
  {
    icon: Compass,
    title: "Find Activities",
    desc: "Explore things to do in every destination.",
  },
  {
    icon: Map,
    title: "Plan Trips",
    desc: "Organize your journey easily.",
  },
  {
    icon: Camera,
    title: "Capture Moments",
    desc: "Save unforgettable travel memories.",
  },
  {
    icon: Star,
    title: "Top Rated Spots",
    desc: "Highly recommended destinations.",
  },
  {
    icon: Mountain,
    title: "Adventure Travel",
    desc: "Explore nature & thrill experiences.",
  },
];

/* =========================
   ANIMATION
========================= */
const fadeText = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

const imageAnim = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-gray-200 px-6 py-16 space-y-20">

      {/* =========================
          HERO
      ========================= */}
      <div className="text-center space-y-2">
        <TextAnimation
                text="About TravelStory 🌍"
                classname="text-4xl md:text-6xl font-bold max-w-3xl"
                direction="up"
              />
        <TextAnimation
                text="Discover beautiful places and travel inspiration."
                classname="text-lg md:text-xl text-gray-600 max-w-2xl"
                direction="up"
              />
      </div>

      {/* =========================
          GALLERY
      ========================= */}
      <section className="max-w-6xl mx-auto">

        <h2 className="text-2xl font-semibold text-center mb-8">
          Travel Gallery
        </h2>

        <div className="columns-2 md:columns-3 gap-4 space-y-4">

          {images.map((img, i) => (
            <motion.img
              key={i}
              src={img}
              variants={imageAnim}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="w-full rounded-xl shadow-md break-inside-avoid cursor-pointer"
            />
          ))}

        </div>
      </section>

      {/* =========================
          INTRO
      ========================= */}
      <motion.section
        variants={fadeText}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        className="max-w-3xl mx-auto text-center"
      >
        <h2 className="text-xl font-semibold mb-2">
          What is TravelStory?
        </h2>

        <p className="text-gray-500">
          A platform to explore destinations, activities and plan your journey easily.
        </p>
      </motion.section>

      {/* =========================
          MARQUEE FEATURES (NEW)
      ========================= */}
      <section className="py-10 overflow-hidden">

        <h2 className="text-2xl font-semibold text-center mb-10">
          What You Can Do
        </h2>

        <div className="relative w-full overflow-hidden">

          <div className="flex w-max animate-marquee hover:pause space-x-8">

            {[...features, ...features].map((item, i) => {
              const Icon = item.icon;

              return (
                <div
                  key={i}
                  className="min-w-[260px] bg-white dark:bg-gray-900 border dark:border-gray-800 rounded-xl p-5 shadow-md text-center"
                >
                  <Icon className="mx-auto text-blue-500 mb-3" size={32} />

                  <h3 className="font-semibold mb-1">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {item.desc}
                  </p>
                </div>
              );
            })}

          </div>
        </div>

        {/* MARQUEE CSS */}
        <style jsx>{`
          .animate-marquee {
            animation: marquee 20s linear infinite;
          }

          .hover\\:pause:hover {
            animation-play-state: paused;
          }

          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>

      </section>

      {/* =========================
          CONTACT
      ========================= */}
      <motion.section
        variants={fadeText}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false }}
        className="text-center space-y-2"
      >
        <h2 className="text-xl font-semibold">Contact</h2>

        <p className="text-gray-500 flex items-center justify-center gap-2">
          <Mail size={16} />
          travelstory@example.com
        </p>
      </motion.section>

    </div>
  );
}