"use client";

import { useState, useEffect } from "react";
import { Search, User, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 6; // stories per page

export default function StoriesPage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterContinent, setFilterContinent] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const [selectedStory, setSelectedStory] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const [form, setForm] = useState({
    title: "",
    author: "",
    image: "",
    content: "",
    continent: "",
    rating: 0,
  });

  // Fetch stories
  const fetchStories = async () => {
    try {
      const res = await fetch("/api/stories");
      const data = await res.json();
      setStories(data.reverse()); // show newest first
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
  }, []);

  // Handle form input
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleRatingChange = (value) => setForm({ ...form, rating: value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        alert("Story submitted!");
        setForm({ title: "", author: "", image: "", content: "", continent: "", rating: 0 });
        setShowForm(false);
        fetchStories();
      } else {
        alert("Failed to submit story");
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Filter stories
  const filteredStories = stories.filter((story) => {
    const matchesSearch =
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesContinent = filterContinent ? story.continent === filterContinent : true;
    const matchesRating = filterRating ? story.rating >= Number(filterRating) : true;
    return matchesSearch && matchesContinent && matchesRating;
  });

  // Pagination
  const totalPages = Math.ceil(filteredStories.length / ITEMS_PER_PAGE);
  const paginatedStories = filteredStories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-200">
      {/* Hero */}
      <section className="text-center py-12 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-2">Travel Stories 📖</h1>
        <p className="max-w-2xl mx-auto text-lg">
          Explore amazing travel experiences from adventurers all around the world.
        </p>
        <Button onClick={() => setShowForm(true)} className="mt-4 flex items-center gap-2 mx-auto">
          <Plus size={16} /> Add Story
        </Button>
      </section>

      {/* Controls */}
      <section className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="flex items-center w-full md:w-1/3 border rounded px-3 py-2">
          <Search className="mr-2 text-gray-500" />
          <input
            type="text"
            placeholder="Search stories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent outline-none text-gray-900 dark:text-gray-200"
          />
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap">
          <select
            className="border p-2 rounded text-black dark:text-white dark:bg-black"
            value={filterContinent}
            onChange={(e) => setFilterContinent(e.target.value)}
          >
            <option value="">All Continents</option>
            <option>Europe</option>
            <option>Asia</option>
            <option>Africa</option>
            <option>North America</option>
            <option>South America</option>
            <option>Oceania</option>
          </select>

          <select
            className="border p-2 rounded text-black dark:text-white dark:bg-black"
            value={filterRating}
            onChange={(e) => setFilterRating(e.target.value)}
          >
            <option value="">All Ratings</option>
            <option value="1">1⭐ & up</option>
            <option value="2">2⭐ & up</option>
            <option value="3">3⭐ & up</option>
            <option value="4">4⭐ & up</option>
            <option value="5">5⭐</option>
          </select>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="max-w-6xl mx-auto px-6 pb-16">
        {loading ? (
          <p className="text-center">Loading stories...</p>
        ) : paginatedStories.length === 0 ? (
          <p className="text-center">No stories found.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedStories.map((story) => (
              <div
                key={story.id}
                className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow duration-200 dark:border-gray-700 cursor-pointer"
              >
                {story.image && (
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{story.title}</h3>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-2 text-sm">
                    <User size={16} /> {story.author}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 text-sm mb-2">
                    {story.content.length > 120
                      ? story.content.slice(0, 120) + "... "
                      : story.content}
                    {story.content.length > 120 && (
                      <button
                        className="text-blue-500 hover:underline ml-1"
                        onClick={() => setSelectedStory(story)}
                      >
                        Read More
                      </button>
                    )}
                  </p>
                  <div className="text-gray-500 dark:text-gray-400 text-xs">
                    {new Date(story.date).toLocaleDateString()} | {story.rating}⭐
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-8 gap-2">
            <Button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Prev
            </Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                variant={i + 1 === currentPage ? "default" : "outline"}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Button>
            ))}
            <Button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </Button>
          </div>
        )}
      </section>

      {/* Read More Modal */}
      {selectedStory && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-start pt-20 z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-3xl relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4"
              onClick={() => setSelectedStory(null)}
            >
              <X />
            </Button>
            {selectedStory.image && (
              <img
                src={selectedStory.image}
                alt={selectedStory.title}
                className="w-full h-64 object-cover rounded mb-4"
              />
            )}
            <h2 className="text-2xl font-bold mb-2">{selectedStory.title}</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-2">{selectedStory.content}</p>
            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
              <span>{selectedStory.author}</span>
              <span>{selectedStory.rating}⭐</span>
            </div>
          </div>
        </div>
      )}

      {/* Story Submission Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-start pt-20 z-50 overflow-auto">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-3xl relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4"
              onClick={() => setShowForm(false)}
            >
              <X />
            </Button>
            <h2 className="text-2xl font-bold mb-4">Submit Your Story</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                className="w-full border p-2 rounded text-black dark:text-white dark:bg-black"
                required
              />
              <input
                name="author"
                placeholder="Your Name"
                value={form.author}
                onChange={handleChange}
                className="w-full border p-2 rounded text-black dark:text-white dark:bg-black"
                required
              />
              <input
                name="image"
                placeholder="Image URL"
                value={form.image}
                onChange={handleChange}
                className="w-full border p-2 rounded text-black dark:text-white dark:bg-black"
              />
              <textarea
                name="content"
                placeholder="Your Story"
                value={form.content}
                onChange={handleChange}
                rows="5"
                className="w-full border p-2 rounded text-black dark:text-white dark:bg-black"
                required
              />
              <select
                name="continent"
                value={form.continent}
                onChange={handleChange}
                className="w-full border p-2 rounded text-black dark:text-white dark:bg-black"
              >
                <option value="">Select Continent</option>
                <option>Europe</option>
                <option>Asia</option>
                <option>Africa</option>
                <option>North America</option>
                <option>South America</option>
                <option>Oceania</option>
              </select>
              <div className="flex items-center gap-2">
                <span>Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`cursor-pointer ${star <= form.rating ? "text-yellow-500" : "text-gray-300"}`}
                    onClick={() => handleRatingChange(star)}
                  >
                    ⭐
                  </span>
                ))}
              </div>
              <Button type="submit" className="w-full mt-2">Submit Story</Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}