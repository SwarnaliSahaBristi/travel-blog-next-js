"use client"

import { useState, useEffect } from "react"
import { Sun, Moon, Menu } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Navbar() {
  const [theme, setTheme] = useState("light")
  const [mounted, setMounted] = useState(false)

  // Safe client-side theme initialization
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light")
    setTheme(initialTheme)
    document.documentElement.classList.toggle("dark", initialTheme === "dark")
    setMounted(true)
  }, [])

  if (!mounted) return null // avoids SSR mismatch

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark", newTheme === "dark")
    localStorage.setItem("theme", newTheme)
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">TravelStory</Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/">Home</Link>
          <Link href="/destinations">Destinations</Link>
          <Link href="/stories">Stories</Link>
          <Link href="/explore">Explore</Link>
          <Link href="/about">About</Link>
        </div>

        {/* Auth + Theme Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline">Login</Button>
          <Button>Register</Button>
          <Button variant="ghost" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger className="md:hidden"><Menu /></SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 mt-10 text-lg">
              <Link href="/">Home</Link>
              <Link href="/destinations">Destinations</Link>
              <Link href="/stories">Stories</Link>
              <Link href="/explore">Explore</Link>
              <Link href="/about">About</Link>
              <Button variant="outline">Login</Button>
              <Button>Register</Button>
              <Button variant="ghost" onClick={toggleTheme}>
                {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}