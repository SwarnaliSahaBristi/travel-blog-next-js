"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import TextAnimation from "../../../../components/uilayouts/scroll-text";
import ScrollBaseAnimation from "@/components/ui/scroll-text-marque";
// import TextAnimation from "@/components/ui/scroll-text";

const destinations = [
  {
    id: 1,
    name: "Paris",
    image: "/images/shutterstock_2464630783-scaled.jpg",
    description: "The city of love, art, and timeless architecture.",
  },
  {
    id: 2,
    name: "Bali",
    image: "/images/bali-for-digital-nomads.jpg",
    description: "Tropical paradise with beaches, temples, and sunsets.",
  },
  {
    id: 3,
    name: "New York",
    image: "/images/caption.jpg",
    description: "The city that never sleeps, full of energy and lights.",
  },
  {
    id: 4,
    name: "Tokyo",
    image: "/images/tokyo-for-digital-nomads.jpg",
    description: "A perfect blend of tradition and futuristic city life.",
  },
  {
    id: 6,
    name: "Swiss Alps",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format",
    description: "Snowy peaks and peaceful alpine villages.",
  },
  {
    id: 7,
    name: "Santorini",
    image:
      "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1200&auto=format",
    description: "White houses, blue domes, and stunning sunsets.",
  },
  {
    id: 8,
    name: "Lake Reflection",
    image:
      "https://images.unsplash.com/photo-1584043204475-8cc101d6c77a?q=80&w=1200&auto=format",
    description: "Perfect mirror-like lake reflection.",
  },
  {
    id: 9,
    name: "Maldives",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1200&auto=format",
    description: "Crystal clear water and overwater villas paradise.",
  },
  {
    id: 10,
    name: "Autumn Retreat",
    image:
      "https://images.unsplash.com/photo-1693581176773-a5f2362209e6?q=80&w=1200&auto=format",
    description: "Cozy autumn mountain cabin view.",
  },
];

const textVariant = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

export default function PopularDestinations() {
  const [index, setIndex] = useState(0);

  return (
    <section className="max-w-7xl mx-auto px-6 py-28 space-y-24">
      {/* TITLE + MARQUEE SECTION */}
      <div className="text-center space-y-10">
        <div className="flex items-center justify-center">
          <TextAnimation
            text="Popular Destinations"
            classname="text-4xl md:text-6xl font-bold max-w-3xl"
            direction="up"
          />
        </div>
        <div className="flex items-center justify-center">
          <TextAnimation
            text="Explore hand-picked destinations loved by travelers around the world."
            classname="text-xl md:text-sm text-gray-500 max-w-2xl"
            direction="up"
          />
        </div>

        {/* 🌍 MARQUEE TEXT HERE */}
        <div className="py-10 overflow-hidden">
          <ScrollBaseAnimation
            delay={300}
            baseVelocity={-3}
            clasname="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Explore • Travel • Discover • Explore • Travel • Discover •
          </ScrollBaseAnimation>

          <ScrollBaseAnimation
            delay={300}
            baseVelocity={3}
            clasname="text-4xl md:text-6xl font-bold tracking-tight"
          >
            Dream • Visit • Experience • Dream • Visit • Experience •
          </ScrollBaseAnimation>
        </div>
      </div>

      {/* GALLERY */}
      <div className="flex gap-3 justify-center items-center overflow-x-auto pb-6">
        {destinations.map((dest, i) => (
          <motion.div
            key={dest.id}
            onClick={() => setIndex(i)}
            onMouseEnter={() => setIndex(i)}
            whileTap={{ scale: 0.95 }}
            animate={{
              width: index === i ? 440 : 90,
              height: 440,
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="relative shrink-0 rounded-2xl overflow-hidden cursor-pointer shadow-xl"
          >
            {/* IMAGE */}
            <Image
              src={dest.image}
              alt={dest.name}
              fill
              className="object-cover"
            />

            {/* OVERLAY */}
            <div className="absolute inset-0 bg-black/30" />

            {/* NAME */}
            <div className="absolute bottom-3 left-3 text-white font-semibold">
              {dest.name}
            </div>

            {/* EXPANDED CONTENT */}
            <AnimatePresence>
              {index === i && (
                <motion.div
                  variants={textVariant}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="absolute inset-0 flex flex-col justify-end p-5 bg-gradient-to-t from-black/80 via-black/30 to-transparent"
                >
                  <motion.h3 className="text-2xl font-bold text-white">
                    {dest.name}
                  </motion.h3>

                  <motion.p className="text-sm text-gray-200 mt-2">
                    {dest.description}
                  </motion.p>

                  <Link
                    href={`/destinations/${dest.id}`}
                    className="mt-4 inline-block text-sm bg-white text-black px-4 py-2 rounded-full w-fit hover:bg-gray-200 transition"
                  >
                    View Details →
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
