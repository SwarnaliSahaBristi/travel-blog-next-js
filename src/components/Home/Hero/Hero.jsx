"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import TextAnimation from "../../../../components/uilayouts/scroll-text";
import ScrollBaseAnimation from "@/components/ui/scroll-text-marque";

export default function Hero() {
  const [theme, setTheme] = useState("dark");

  /* 🌗 Load Theme */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  return (
    <>
      {/* ================= HERO SECTION ================= */}
      <section className="relative min-h-screen overflow-hidden">
        {/* 🎥 Background Video */}
        <video
          autoPlay
          loop
          muted
          preload="none"
          poster="/images/hero.jpg"
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://res.cloudinary.com/drdzheiz2/video/upload/q_auto,f_auto,w_1280/hero_vsqr3z.mp4"
            type="video/mp4"
          />
        </video>

        {/* 🌗 Overlay */}
        <div className="absolute inset-0 bg-white/10 dark:bg-black/60 transition-colors duration-500"></div>

        {/* ✨ CONTENT */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT */}
          <div className="space-y-6 text-center lg:text-left">
            <p className="text-blue-500 dark:text-blue-400 text-sm">
              🌍 Trusted by 10,000+ travelers
            </p>

            <div className="flex items-center justify-center lg:justify-start">
              <TextAnimation
                text="Discover places that feel like dreams."
                classname="text-4xl md:text-6xl font-bold max-w-3xl"
                direction="up"
              />
            </div>

            <div className="flex items-center justify-center lg:justify-start">
              <TextAnimation
                text="Explore hidden gems, curated destinations, and unforgettable travel experiences tailored just for you."
                classname="text-lg md:text-xl text-gray-200 max-w-2xl"
                direction="up"
              />
            </div>

            <div className="flex justify-center lg:justify-start">
              <Link
                href="/destinations"
                className="bg-white dark:bg-gray-900 text-black dark:text-white px-6 py-3 rounded-full font-medium hover:opacity-80 transition"
              >
                Start Exploring
              </Link>
            </div>
          </div>

          {/* RIGHT GLASS CARD */}
          <div className="backdrop-blur-xl bg-white/30 dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-2xl p-6 shadow-xl max-w-md mx-auto lg:ml-auto transition-colors">
            <div className="flex -space-x-3 mb-4 justify-center lg:justify-start">
              <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
              <div className="w-10 h-10 bg-green-500 rounded-full"></div>
              <div className="w-10 h-10 bg-red-500 rounded-full"></div>
            </div>

            <p className="text-sm text-gray-700 dark:text-gray-200 text-center lg:text-left">
              “TravelStory helped me discover places I never imagined. The
              experience was smooth and inspiring.”
            </p>

            <p className="mt-3 font-semibold text-gray-900 dark:text-white text-center lg:text-left">
              — Alice, Traveler
            </p>
          </div>
        </div>
      </section>

      {/* ================= FULL WIDTH MARQUEE ================= */}
      <section className="relative w-full overflow-hidden bg-white dark:bg-black">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 w-24 h-full bg-gradient-to-r from-white dark:from-black to-transparent z-10" />

        {/* Right Fade */}
        <div className="absolute right-0 top-0 w-24 h-full bg-gradient-to-l from-white dark:from-black to-transparent z-10" />

        <ScrollBaseAnimation
          delay={300}
          baseVelocity={-4}
          clasname="text-2xl md:text-4xl font-bold tracking-tight whitespace-nowrap"
        >
          Explore • Travel • Discover • Explore • Travel • Discover •
        </ScrollBaseAnimation>

        <ScrollBaseAnimation
          delay={300}
          baseVelocity={4}
          clasname="text-2xl md:text-4xl font-bold tracking-tight whitespace-nowrap mt-4"
        >
          Dream • Visit • Experience • Dream • Visit • Experience •
        </ScrollBaseAnimation>
      </section>
    </>
  );
}
