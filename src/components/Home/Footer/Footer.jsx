"use client";

import Link from "next/link";
import { Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import TextAnimation from "../../../../components/uilayouts/scroll-text";

export default function Footer() {
  const resources = [
    { name: "Destinations", href: "/destinations" },
    { name: "Travel Stories", href: "/stories" },
    { name: "Explore", href: "/explore" },
  ];

  const company = [
    { name: "About Us", href: "/about" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/contact" },
  ];

  const legal = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo / Brand */}
        <div className="flex flex-col gap-4">
          <TextAnimation
            text="TravelStory"
            className="text-7xl font-bold text-primary"
            direction="up"
          />
          <TextAnimation
            text="Explore the world with curated destinations, travel stories, and guides to make your trips unforgettable."
            classname="text-sm text-gray-500 dark:text-gray-400"
            direction="down"
          />
        </div>

        {/* Resource Links */}
        <div>
          <h3 className="font-semibold mb-4">Resources</h3>
          <ul className="flex flex-col gap-2 text-sm">
            {resources.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-semibold mb-4">Company</h3>
          <ul className="flex flex-col gap-2 text-sm">
            {company.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h3 className="font-semibold mb-4">Legal</h3>
          <ul className="flex flex-col gap-2 text-sm">
            {legal.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700"></div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500 dark:text-gray-400">
        <p>
          &copy; {new Date().getFullYear()} TravelStory. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a
            href="#"
            aria-label="Instagram"
            className="hover:text-primary transition-colors duration-200"
          >
            <Instagram className="w-5 h-5" />
          </a>
          <a
            href="#"
            aria-label="Facebook"
            className="hover:text-primary transition-colors duration-200"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="hover:text-primary transition-colors duration-200"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="hover:text-primary transition-colors duration-200"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
