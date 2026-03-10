"use client";

import { useState, useEffect } from "react";
import { Sun, Moon, Menu, ChevronDown } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const session = useSession();
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          TravelStory
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/">Home</Link>
          <Link href="/destinations">Destinations</Link>
          <Link href="/destinations-add">Add Destination</Link>
          <Link href="/destinations-manage">Manage Destination</Link>
          <Link href="/stories">Stories</Link>
          <Link href="/about">About</Link>
        </div>

        {/* Auth + Theme */}
        <div className="hidden md:flex items-center gap-3 relative">
          {session.status === "authenticated" ? (
            <div className="flex items-center gap-2 relative">
              {/* User Image */}
              {session.data.user.image && (
                <img
                  src={session.data.user.image}
                  alt={session.data.user.name || "User"}
                  className="w-8 h-8 rounded-full object-cover cursor-pointer"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                />
              )}
              <ChevronDown
                className="w-4 h-4 cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {/* Dropdown */}
              {dropdownOpen && (
                <div className="absolute top-10 right-0 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded shadow-md w-40 z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Settings
                  </Link>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => signOut()}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/auth/login" passHref>
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/auth/register" passHref>
                <Button>Register</Button>
              </Link>
            </>
          )}

          <Button variant="ghost" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu />
          </SheetTrigger>
          <SheetContent side="right">
            <div className="flex flex-col gap-6 mt-10 text-lg">
              <Link href="/">Home</Link>
              <Link href="/destinations">Destinations</Link>
              <Link href="/destinations-add">Add Destination</Link>
              <Link href="/destinations-manage">Manage Destination</Link>
              <Link href="/stories">Stories</Link>
              <Link href="/about">About</Link>

              {session.status === "authenticated" ? (
                <div className="flex items-center gap-2">
                  {session.data.user.image && (
                    <img
                      src={session.data.user.image}
                      alt={session.data.user.name || "User"}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                  <span className="text-sm">{session.data.user.name}</span>
                  <Button onClick={() => signOut()}>Log out</Button>
                </div>
              ) : (
                <>
                  <Link href="/auth/login" passHref>
                    <Button variant="outline">Login</Button>
                  </Link>
                  <Link href="/auth/register" passHref>
                    <Button>Register</Button>
                  </Link>
                </>
              )}

              <Button variant="ghost" onClick={toggleTheme}>
                {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}