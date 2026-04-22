'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/* =========================
   STATIC IMAGES
========================= */
const images = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    title: "Beach Paradise",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    title: "Mountain View",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    title: "Sunset Hills",
  },
  {
    id: 4,
    url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    title: "Forest Road",
  },
  {
    id: 5,
    url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    title: "City Night",
  },
  {
    id: 6,
    url: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",
    title: "Lake View",
  },
];

/* =========================
   ANIMATION
========================= */
const card = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

/* =========================
   MAIN GALLERY
========================= */
export default function RepeatScrollGallery() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="container mx-auto p-4">

      <div className="columns-2 md:columns-3 gap-4 space-y-4">

        {images.map((img) => (
          <ImageCard
            key={img.id}
            img={img}
            setSelected={setSelected}
          />
        ))}

      </div>

      {/* LIGHTBOX */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
          onClick={() => setSelected(null)}
        >
          <img
            src={selected.url}
            className="max-h-[90vh] max-w-[90vw] rounded-lg"
          />
        </div>
      )}

    </div>
  );
}

/* =========================
   IMAGE CARD (REPEAT ANIMATION)
========================= */
function ImageCard({ img, setSelected }) {
  const ref = useRef(null);

  // ❗ NO "once: true"
  const isInView = useInView(ref, {
    margin: "-80px",
  });

  return (
    <motion.figure
      ref={ref}
      variants={card}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"} // 🔥 re-triggers every scroll
      whileTap={{ scale: 0.95 }}
      className="relative break-inside-avoid overflow-hidden rounded-xl cursor-pointer group"
      onClick={() => setSelected(img)}
    >

      <motion.img
        src={img.url}
        whileHover={{ scale: 1.05 }}
        className="w-full transition"
      />

      <div className="absolute bottom-0 left-0 p-3 opacity-0 group-hover:opacity-100 text-white bg-gradient-to-t from-black/70 w-full">
        {img.title}
      </div>

    </motion.figure>
  );
}