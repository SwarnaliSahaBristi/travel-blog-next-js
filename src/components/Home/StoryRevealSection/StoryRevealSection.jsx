"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import TextAnimation from "../../../../components/uilayouts/scroll-text";

/* FEATURES */
const features = [
  {
    id: 1,
    title: "Discover Hidden Places",
    desc: "Find secret destinations that are not crowded and full of natural beauty. These places are often untouched by mass tourism, giving you a peaceful and authentic travel experience.",
    image: "/images/shutterstock_2464630783-scaled.jpg",
  },
  {
    id: 2,
    title: "Bali Tropical Escape",
    desc: "Relax on stunning beaches surrounded by crystal-clear water and warm tropical air. Bali offers a perfect balance between adventure and relaxation.",
    image: "/images/bali-for-digital-nomads.jpg",
  },
  {
    id: 3,
    title: "New York Energy",
    desc: "Experience the unstoppable energy of the city that never sleeps. From Times Square lights to Central Park calmness.",
    image: "/images/caption.jpg",
  },
  {
    id: 4,
    title: "Tokyo Fusion",
    desc: "A perfect blend of ancient traditions and futuristic innovation with neon-lit streets and peaceful temples.",
    image: "/images/tokyo-for-digital-nomads.jpg",
  },
  {
    id: 5,
    title: "Swiss Mountain Peace",
    desc: "Calmness in the Swiss Alps surrounded by snow-covered peaks and peaceful villages.",
    image:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1200&auto=format",
  },
];

/* ANIMATION */
const leftVariant = {
  hidden: { opacity: 0, x: -120 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const rightVariant = {
  hidden: { opacity: 0, x: 120 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function StoryRevealSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 space-y-28">

      {/* TITLE */}
      <div className="text-center space-y-4">
        <TextAnimation
          text="Stories That Come Alive As You Scroll"
          classname="text-4xl md:text-6xl font-bold"
          direction="up"
        />
        <p className="text-gray-500 max-w-2xl mx-auto">
          Each story appears as you reach it — smooth, clean, and modern.
        </p>
      </div>

      {/* FEATURES */}
      {features.map((item, i) => {
        const isEven = i % 2 === 0;

        return (
          <div
            key={item.id}
            className="grid md:grid-cols-2 gap-10 items-center"
          >

            {/* TEXT */}
            <motion.div
              variants={isEven ? leftVariant : rightVariant}
              initial="hidden"
              whileInView="show"
              viewport={{once: false, amount: 0.4 }}
              className={`space-y-4 ${isEven ? "md:order-1" : "md:order-2"}`}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {item.title}
              </h2>

              <p className="text-gray-500 text-lg leading-relaxed">
                {item.desc}
              </p>
            </motion.div>

            {/* IMAGE */}
            <motion.div
              variants={isEven ? rightVariant : leftVariant}
              initial="hidden"
              whileInView="show"
              viewport={{once: false, amount: 0.4 }}
              className={`relative h-[400px] rounded-3xl overflow-hidden shadow-xl ${
                isEven ? "md:order-2" : "md:order-1"
              }`}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </motion.div>

          </div>
        );
      })}
    </section>
  );
}