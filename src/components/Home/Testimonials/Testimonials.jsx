import Marquee from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

/* 🌍 YOUR REAL TESTIMONIAL DATA */
const reviews = [
  {
    name: "Alice",
    username: "Bangladesh",
    body: "TravelStory made my trip planning effortless. I discovered places I never knew existed!",
    img: "bg-emerald-500",
  },
  {
    name: "Bob",
    username: "UK",
    body: "Absolutely amazing experience. The recommendations were spot on every time.",
    img: "bg-blue-500",
  },
  {
    name: "Charlie",
    username: "Canada",
    body: "I love how easy it is to find hidden travel gems. Highly recommended!",
    img: "bg-red-500",
  },
  {
    name: "Diana",
    username: "USA",
    body: "Beautiful UI and very helpful travel ideas. It feels like a personal guide.",
    img: "bg-yellow-500",
  },
  {
    name: "Ethan",
    username: "Australia",
    body: "One of the best travel inspiration platforms I’ve used so far.",
    img: "bg-purple-500",
  },
  {
    name: "Sophia",
    username: "Germany",
    body: "Simple, elegant, and super useful for planning my vacations.",
    img: "bg-pink-500",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

function ReviewCard({ img, name, username, body }) {
  return (
    <figure
      className={cn(
        "relative w-72 cursor-pointer overflow-hidden rounded-2xl border p-5",
        "border-neutral-950/10 bg-white/70 backdrop-blur-md hover:bg-white/90",
        "dark:border-neutral-50/10 dark:bg-neutral-900/40 dark:hover:bg-neutral-900/60",
        "shadow-md hover:shadow-xl transition-all"
      )}
    >
      <div className="flex items-center gap-3">
        <div className={cn("rounded-full w-10 h-10", img)}></div>

        <div>
          <figcaption className="text-sm font-semibold text-gray-900 dark:text-white">
            {name}
          </figcaption>
          <p className="text-xs text-gray-500">{username}</p>
        </div>
      </div>

      <blockquote className="mt-3 text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
        “{body}”
      </blockquote>
    </figure>
  );
}

export default function Testimonials() {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-neutral-950 dark:to-neutral-900">

      {/* 🌟 HEADER */}
      <div className="text-center mb-14 px-6">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
          What Travelers Say About Us
        </h2>

        <p className="mt-4 text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
          Real experiences from real travelers who discovered amazing journeys through TravelStory.
        </p>
      </div>

      {/* 🌊 MARQUEE 1 */}
      <Marquee pauseOnHover className="[--duration:25s]">
        {firstRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>

      {/* 🌊 MARQUEE 2 */}
      <Marquee reverse pauseOnHover className="[--duration:25s]">
        {secondRow.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>

      {/* 🌫️ EDGE FADE EFFECT */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white dark:from-neutral-950"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white dark:from-neutral-950"></div>
    </section>
  );
}