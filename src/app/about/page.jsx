"use client";

import { Map, Globe, Compass, Mail } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-800 dark:text-gray-200">

      {/* Hero Section */}
      <section className="text-center py-20 px-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About TravelStory 🌍
        </h1>
        <p className="max-w-2xl mx-auto text-lg">
          Discover amazing destinations, explore travel experiences,
          and find inspiration for your next adventure.
        </p>
      </section>

      {/* About TravelStory */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          What is TravelStory?
        </h2>
        <p className="text-center max-w-3xl mx-auto text-lg">
          TravelStory is a travel discovery platform where users can explore
          destinations around the world, learn about activities, check ratings,
          and plan their next trip easily. Our goal is to inspire people to
          explore the beauty of our planet and make travel planning simple.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-100 dark:bg-gray-900 py-16 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
            <h3 className="text-2xl font-semibold mb-3">🌟 Our Mission</h3>
            <p>
              Our mission is to help travelers discover incredible destinations
              and experiences by providing helpful travel information and
              inspiring travel stories.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow">
            <h3 className="text-2xl font-semibold mb-3">🚀 Our Vision</h3>
            <p>
              We aim to create a global community where travelers can explore
              destinations, share experiences, and inspire others to travel the
              world.
            </p>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          What You Can Do
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="text-center p-6 border rounded-lg dark:border-gray-700">
            <Globe className="mx-auto mb-4 text-blue-500" size={40} />
            <h3 className="text-xl font-semibold mb-2">
              Explore Destinations
            </h3>
            <p>
              Discover beautiful places around the world with detailed travel
              information.
            </p>
          </div>

          <div className="text-center p-6 border rounded-lg dark:border-gray-700">
            <Compass className="mx-auto mb-4 text-green-500" size={40} />
            <h3 className="text-xl font-semibold mb-2">
              Find Activities
            </h3>
            <p>
              Learn about exciting activities and experiences available at each
              destination.
            </p>
          </div>

          <div className="text-center p-6 border rounded-lg dark:border-gray-700">
            <Map className="mx-auto mb-4 text-purple-500" size={40} />
            <h3 className="text-xl font-semibold mb-2">
              Plan Your Trip
            </h3>
            <p>
              See ratings, reviews, and best travel seasons to plan your
              adventure easily.
            </p>
          </div>

        </div>
      </section>

      {/* Developer Section */}
      <section className="bg-gray-100 dark:bg-gray-900 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-4">
          About the Developer
        </h2>

        <p className="max-w-2xl mx-auto text-lg">
          TravelStory is built using modern web technologies like
          <span className="font-semibold"> Next.js, Tailwind CSS, and React </span>
          to provide a fast, responsive, and enjoyable experience for travelers.
        </p>
      </section>

      {/* Contact Section */}
      <section className="max-w-6xl mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">
          Contact Us
        </h2>

        <p className="mb-4">
          Have suggestions or questions? We had love to hear from you!
        </p>

        <div className="flex justify-center items-center gap-2">
          <Mail size={20} />
          <span>travelstory@example.com</span>
        </div>
      </section>

    </div>
  );
}