"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function AddDestinationPage() {
  const [form, setForm] = useState({
    name: "",
    country: "",
    image: "",
    description: "",
    rating: 0,
    reviews: 0,
    bestTimeToVisit: "",
    activities: [],
    priceLevel: "$$",
    continent: "",
  });

  const [activityInput, setActivityInput] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRating = (value) => {
    setForm({ ...form, rating: value });
  };

  const addActivity = () => {
    if (!activityInput) return;
    setForm({ ...form, activities: [...form.activities, activityInput] });
    setActivityInput("");
  };

  const removeActivity = (index) => {
    const updated = form.activities.filter((_, i) => i !== index);
    setForm({ ...form, activities: updated });
  };

  // Handle local image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
      setForm({ ...form, image: reader.result }); // store base64
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/destinations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      alert("Destination added successfully!");
      setForm({
        name: "",
        country: "",
        image: "",
        description: "",
        rating: 0,
        reviews: 0,
        bestTimeToVisit: "",
        activities: [],
        priceLevel: "$$",
        continent: "",
      });
      setImagePreview(null);
      setActivityInput("");
    } else {
      alert("Error adding destination");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Add Destination</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Name */}
        <div>
          <label className="font-medium">Destination Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Country */}
        <div>
          <label className="font-medium">Country</label>
          <input
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Continent */}
        <div>
          <label className="font-medium">Continent</label>
          <select
            name="continent"
            value={form.continent}
            onChange={handleChange}
            className="w-full border p-2 rounded"
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

        {/* Image Upload */}
        <div>
          <label className="font-medium">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full border p-2 rounded"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt={form.name}
              className="mt-3 rounded w-full h-52 object-cover"
            />
          )}
        </div>

        {/* Description */}
        <div>
          <label className="font-medium">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Rating */}
        <div>
          <label className="font-medium block mb-1">Rating</label>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                onClick={() => handleRating(star)}
                className={`cursor-pointer ${
                  star <= form.rating ? "text-yellow-500 fill-yellow-500" : ""
                }`}
              />
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div>
          <label className="font-medium">Reviews</label>
          <input
            type="number"
            name="reviews"
            value={form.reviews}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Best Time */}
        <div>
          <label className="font-medium">Best Time To Visit</label>
          <input
            name="bestTimeToVisit"
            value={form.bestTimeToVisit}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Activities Tags */}
        <div>
          <label className="font-medium">Activities</label>
          <div className="flex gap-2 mt-1">
            <input
              value={activityInput}
              onChange={(e) => setActivityInput(e.target.value)}
              className="border p-2 rounded w-full"
              placeholder="Add activity"
            />
            <Button type="button" onClick={addActivity}>
              Add
            </Button>
          </div>

          <div className="flex gap-2 flex-wrap mt-2">
            {form.activities.map((act, i) => (
              <span
                key={i}
                className="bg-gray-200 px-3 py-1 rounded-full cursor-pointer"
                onClick={() => removeActivity(i)}
              >
                {act} ✕
              </span>
            ))}
          </div>
        </div>

        {/* Price */}
        <div>
          <label className="font-medium">Price Level</label>
          <select
            name="priceLevel"
            value={form.priceLevel}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option>$</option>
            <option>$$</option>
            <option>$$$</option>
          </select>
        </div>

        <Button type="submit" className="w-full">
          Add Destination
        </Button>
      </form>
    </div>
  );
}