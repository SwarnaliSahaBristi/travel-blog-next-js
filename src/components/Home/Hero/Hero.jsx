"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import TextAnimation from "../../../../components/uilayouts/scroll-text";

export default function Hero() {
  const [theme, setTheme] = useState("dark");

  /* 🌗 Load Theme */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">

      {/* 🎥 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="/videos/hero.mp4"
          type="video/mp4"
        />
      </video>

      {/* 🌗 Theme Overlay */}
      <div className="absolute inset-0 bg-white/10 dark:bg-black/60 transition-colors duration-500"></div>

      {/* ✨ HERO CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* LEFT */}
        <div className="space-y-6 text-center lg:text-left">

          <p className="text-blue-500 dark:text-blue-400 text-sm">
            🌍 Trusted by 10,000+ travelers
          </p>

        <div className="flex items-center justify-center">
          <TextAnimation
            text="Discover places that feel like dreams."
            classname="text-4xl md:text-6xl font-bold max-w-3xl"
            direction="up"
          />
        </div>
        <div className="flex items-center justify-center">
          <TextAnimation
            text="Explore hidden gems, curated destinations, and unforgettable travel
            experiences tailored just for you."
            classname="text-xl md:text-sm text-gray-500 max-w-2xl"
            direction="up"
          />
        </div>

          {/* <p className="text-gray-700 dark:text-gray-300 max-w-lg mx-auto lg:mx-0">
            Explore hidden gems, curated destinations, and unforgettable travel
            experiences tailored just for you.
          </p> */}

          <Link href="/destinations" className="bg-white dark:bg-gray-900 text-black dark:text-white px-6 py-3 rounded-full font-medium hover:opacity-80 transition">
            Start Exploring
          </Link>
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
  );
}