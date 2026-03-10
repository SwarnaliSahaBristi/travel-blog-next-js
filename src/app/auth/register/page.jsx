"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { postUser } from "@/action/server/auth";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (form.password !== form.password) {
      return alert("Passwords do not match");
    }

    const userData = {
      ...form,
      image,
    };

    const result = await postUser(userData);
    if (!result.success) {
      return Swal.fire({
        icon: "error",
        title: result.message,
      });
    }

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Account registered successfully!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      router.push("/auth/login");
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Register for TravelStory
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleRegister}>
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
            required
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
            required
          />

          {/* Image Upload */}
          <div>
            <label className="font-medium text-gray-700 dark:text-gray-200">
              Upload Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full border p-2 rounded mt-1"
            />

            {imagePreview && (
              <img
                src={imagePreview}
                alt={form.name}
                className="mt-3 rounded w-full h-52 object-cover"
              />
            )}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
              required
            />

            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </div>

          <Button type="submit">Register</Button>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <a href="/auth/login" className="text-primary font-semibold">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
