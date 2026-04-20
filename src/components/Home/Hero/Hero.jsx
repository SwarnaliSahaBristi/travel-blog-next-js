"use client";

import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  /* 🌗 Load saved theme */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  /* 🌗 Toggle theme */
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <section className="relative min-h-screen overflow-hidden text-white dark:text-white">

      {/* 🎥 Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://videos.pexels.com/video-files/9318313/9318313-uhd_2560_1440_24fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* 🌑 Overlay */}
      <div className="absolute inset-0 bg-black/60 dark:bg-black/70"></div>

      {/* 🔝 NAVBAR */}
      <header className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 py-5 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          TravelStory
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex gap-6 text-sm font-medium">
          <Link href="/">Home</Link>
          <Link href="/destinations">Destinations</Link>
          <Link href="/destinations-add">Add Destination</Link>
          <Link href="/destinations-manage">Manage</Link>
          <Link href="/stories">Stories</Link>
          <Link href="/about">About</Link>
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">

          {/* 🌗 Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-blue-400" />
            )}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-md bg-white/10 backdrop-blur-md border border-white/20"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* 📱 MOBILE MENU */}
      {open && (
        <div className="absolute z-30 top-20 left-0 w-full bg-black/90 backdrop-blur-lg p-6 flex flex-col gap-5 text-center lg:hidden">
          <Link href="/" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/destinations" onClick={() => setOpen(false)}>Destinations</Link>
          <Link href="/destinations-add" onClick={() => setOpen(false)}>Add Destination</Link>
          <Link href="/destinations-manage" onClick={() => setOpen(false)}>Manage</Link>
          <Link href="/stories" onClick={() => setOpen(false)}>Stories</Link>
          <Link href="/about" onClick={() => setOpen(false)}>About</Link>
        </div>
      )}

      {/* ✨ HERO CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-20 sm:pt-28 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

        {/* LEFT CONTENT */}
        <div className="space-y-6 text-center lg:text-left">

          <p className="text-blue-400 text-sm">
            🌍 Trusted by 10,000+ travelers
          </p>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Discover the world
            <br />
            <span className="text-blue-400">like never before</span>
          </h1>

          <p className="text-gray-300 max-w-lg mx-auto lg:mx-0">
            Explore hidden gems, curated destinations, and unforgettable
            travel experiences tailored just for you.
          </p>

          <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition">
            Start Exploring
          </button>
        </div>

        {/* RIGHT GLASS CARD */}
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl p-6 shadow-xl max-w-md mx-auto lg:ml-auto">

          {/* Avatars */}
          <div className="flex -space-x-3 mb-4 justify-center lg:justify-start">
            <div className="w-10 h-10 bg-blue-500 rounded-full"></div>
            <div className="w-10 h-10 bg-green-500 rounded-full"></div>
            <div className="w-10 h-10 bg-red-500 rounded-full"></div>
          </div>

          {/* Text */}
          <p className="text-sm text-gray-200 text-center lg:text-left">
            “TravelStory helped me discover places I never imagined. The
            experience was smooth and inspiring.”
          </p>

          <p className="mt-3 font-semibold text-center lg:text-left">
            — Alice, Traveler
          </p>
        </div>
      </div>
    </section>
  );
}