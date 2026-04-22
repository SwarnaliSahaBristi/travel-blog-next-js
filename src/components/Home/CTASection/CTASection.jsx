"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import TextAnimation from "../../../../components/uilayouts/scroll-text";

export default function CTASection() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subscribed:", email);
  };

  return (
    <section className="w-full relative overflow-hidden py-28">
      {/* BACKGROUND (theme aware) */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-black" />

        {/* glowing blobs */}
        <div className="absolute w-[500px] h-[500px] bg-blue-400/30 blur-[140px] top-[-150px] left-[-150px]" />
        <div className="absolute w-[500px] h-[500px] bg-purple-500/30 blur-[140px] bottom-[-180px] right-[-180px]" />
      </div>

      {/* CONTENT WRAPPER FULL WIDTH FEEL */}
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
          className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white/70 dark:bg-white/5 backdrop-blur-xl shadow-2xl p-10 md:p-16 text-center"
        >
          {/* TITLE */}
          <TextAnimation
            text="Explore More Travel Stories ✈️"
            classname="text-4xl md:text-6xl font-bold max-w-3xl"
            direction="up"
          />
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get exclusive travel guides, hidden destinations, and inspiring
            stories from around the world. Delivered directly to your inbox.
          </p>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="mt-10 flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
          >
            <input
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 px-5 py-3 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-black text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <Button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
            >
              Subscribe
            </Button>
          </form>

          {/* FOOTNOTE */}
          <p className="mt-6 text-sm text-gray-500 dark:text-gray-400">
            No spam. Only travel inspiration.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
