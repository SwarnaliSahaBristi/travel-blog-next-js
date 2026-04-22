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

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileDestOpen, setMobileDestOpen] = useState(false);

  /* 🌗 Theme Load */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
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

        {/* LOGO */}
        <Link href="/" className="text-xl font-bold">
          TravelStory
        </Link>

        {/* ================= DESKTOP MENU ================= */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">

          <Link href="/" className="hover:text-blue-500 transition">
            Home
          </Link>

          {/* 🌍 DESTINATIONS DROPDOWN */}
          <div className="relative group">

            <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500 transition">
              <span>Destinations</span>
              <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
            </div>

            <div className="absolute left-0 top-8 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-2 group-hover:translate-y-0">

              <div className="bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl shadow-xl overflow-hidden">

                <Link
                  href="/destinations"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  All Destinations
                </Link>

                <Link
                  href="/destinations-add"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Add Destination
                </Link>

                <Link
                  href="/destinations-manage"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  Manage Destination
                </Link>

              </div>
            </div>
          </div>

          <Link href="/stories" className="hover:text-blue-500 transition">
            Stories
          </Link>

          <Link href="/about" className="hover:text-blue-500 transition">
            About
          </Link>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="hidden md:flex items-center gap-3 relative">

          {/* AUTH */}
          {session.status === "authenticated" ? (
            <div className="flex items-center gap-2 relative">

              {session.data.user.image && (
                <img
                  src={session.data.user.image}
                  alt="user"
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={() => setProfileOpen(!profileOpen)}
                />
              )}

              <ChevronDown
                className="w-4 h-4 cursor-pointer"
                onClick={() => setProfileOpen(!profileOpen)}
              />

              {profileOpen && (
                <div className="absolute top-10 right-0 w-40 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg shadow-lg overflow-hidden">

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
                    onClick={() => signOut()}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    Logout
                  </button>

                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Register</Button>
              </Link>
            </>
          )}

          {/* THEME */}
          <Button variant="ghost" onClick={toggleTheme}>
            {theme === "light"
              ? <Moon className="w-4 h-4" />
              : <Sun className="w-4 h-4" />
            }
          </Button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu />
          </SheetTrigger>

          <SheetContent side="right" className="w-72">

            <div className="flex flex-col gap-5 mt-10 text-base p-4">

              <Link href="/">Home</Link>

              {/* 🌍 MOBILE DESTINATIONS (BETTER DROPDOWN) */}
              <div className="border rounded-lg overflow-hidden">

                <button
                  onClick={() => setMobileDestOpen(!mobileDestOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 font-medium"
                >
                  Destinations
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileDestOpen ? "rotate-180" : ""}`} />
                </button>

                {mobileDestOpen && (
                  <div className="flex flex-col bg-gray-50 dark:bg-gray-900 text-sm">

                    <Link
                      href="/destinations"
                      className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800"
                    >
                      All Destinations
                    </Link>

                    <Link
                      href="/destinations-add"
                      className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800"
                    >
                      Add Destination
                    </Link>

                    <Link
                      href="/destinations-manage"
                      className="px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-800"
                    >
                      Manage Destination
                    </Link>

                  </div>
                )}
              </div>

              <Link href="/stories">Stories</Link>
              <Link href="/about">About</Link>

              {/* AUTH MOBILE */}
              {session.status === "authenticated" ? (
                <div className="flex flex-col gap-2 pt-4">

                  <span className="text-sm font-medium">
                    {session.data.user.name}
                  </span>

                  <Button onClick={() => signOut()}>Logout</Button>
                </div>
              ) : (
                <div className="flex flex-col gap-2 pt-4">
                  <Link href="/auth/login">
                    <Button variant="outline" className="w-full">Login</Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button className="w-full">Register</Button>
                  </Link>
                </div>
              )}

              {/* THEME */}
              <Button variant="ghost" onClick={toggleTheme}>
                {theme === "light"
                  ? <Moon className="w-5 h-5" />
                  : <Sun className="w-5 h-5" />
                }
              </Button>

            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}