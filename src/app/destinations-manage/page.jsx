"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Trash, Edit, X, Sun, Moon } from "lucide-react";

export default function ManageDestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");

  // Edit modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editForm, setEditForm] = useState(null);

  // Theme toggle
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const fetchDestinations = async () => {
    try {
      const res = await fetch("/api/destinations");
      const data = await res.json();
      setDestinations(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching destinations:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this destination?")) return;
    try {
      const res = await fetch(`/api/destinations/${id}`, { method: "DELETE" });
      if (res.ok) {
        setDestinations(destinations.filter((d) => d.id !== id));
      } else {
        alert("Failed to delete destination");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (dest) => {
    setEditForm(dest);
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleRating = (value) => {
    setEditForm({ ...editForm, rating: value });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/destinations/${editForm.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      if (res.ok) {
        alert("Destination updated successfully!");
        fetchDestinations();
        setIsModalOpen(false);
      } else {
        alert("Failed to update destination");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center">Manage Destinations</h1>
        <Button variant="outline" onClick={toggleTheme}>
          {theme === "light" ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </Button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : destinations.length === 0 ? (
        <p className="text-center">No destinations found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border dark:border-gray-700 text-black dark:text-white">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="border p-2">Image</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Country</th>
                <th className="border p-2">Continent</th>
                <th className="border p-2">Rating</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {destinations.map((dest) => (
                <tr
                  key={dest.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="border p-2">
                    <img
                      src={dest.image || "/images/default.jpg"}
                      alt={dest.name}
                      className="w-24 h-16 object-cover rounded"
                    />
                  </td>
                  <td className="border p-2">{dest.name}</td>
                  <td className="border p-2">{dest.country}</td>
                  <td className="border p-2">{dest.continent}</td>
                  <td className="border p-2">{dest.rating} ⭐</td>
                  <td className="border p-2">{dest.priceLevel}</td>
                  <td className="border p-2 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEditClick(dest)}>
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(dest.id)}
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {isModalOpen && editForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-start pt-20 z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full max-w-3xl relative">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4"
              onClick={() => setIsModalOpen(false)}
            >
              <X />
            </Button>
            <h2 className="text-2xl font-bold mb-4">Edit Destination</h2>
            <form className="space-y-4" onSubmit={handleUpdateSubmit}>
              <div>
                <label className="font-medium">Name</label>
                <input
                  name="name"
                  value={editForm.name}
                  onChange={handleChange}
                  className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="font-medium">Country</label>
                <input
                  name="country"
                  value={editForm.country}
                  onChange={handleChange}
                  className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="font-medium">Continent</label>
                <select
                  name="continent"
                  value={editForm.continent}
                  onChange={handleChange}
                  className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:text-white"
                >
                  <option value="">Select</option>
                  <option>Europe</option>
                  <option>Asia</option>
                  <option>Africa</option>
                  <option>North America</option>
                  <option>South America</option>
                  <option>Oceania</option>
                </select>
              </div>
              <div>
                <label className="font-medium">Image URL</label>
                <input
                  name="image"
                  value={editForm.image}
                  onChange={handleChange}
                  className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:text-white"
                />
                {/* {editForm.image && (
                  <img
                    src={editForm.image}
                    alt={editForm.name}
                    className="mt-2 w-full h-48 object-cover rounded"
                  />
                )} */}
              </div>
              <div>
                <label className="font-medium">Description</label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleChange}
                  className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="font-medium">Rating</label>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`cursor-pointer ${
                        star <= editForm.rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                      onClick={() => handleRating(star)}
                    >
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <label className="font-medium">Reviews</label>
                <input
                  name="reviews"
                  type="number"
                  value={editForm.reviews}
                  onChange={handleChange}
                  className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:text-white"
                />
              </div>
              <div>
                <label className="font-medium">Price Level</label>
                <select
                  name="priceLevel"
                  value={editForm.priceLevel}
                  onChange={handleChange}
                  className="w-full border p-2 rounded bg-white dark:bg-gray-800 dark:text-white"
                >
                  <option>$</option>
                  <option>$$</option>
                  <option>$$$</option>
                </select>
              </div>
              <Button type="submit" className="w-full mt-4">
                Update Destination
              </Button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}