"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      alert("Login Successful!!");
      router.push("/");
    } else {
      alert("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    // This will redirect to Google OAuth
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow p-8">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Login to TravelStory
        </h1>

        {/* Social Login */}
        <div className="flex flex-col gap-4 mb-6">
          {/* <Button onClick={handleGoogleLogin} className="bg-white text-black dark:bg-black dark:text-white border-2">
           Sign in with Google
          </Button> */}
        </div>

        <hr className="my-6 border-gray-300 dark:border-gray-600" />

        {/* Credentials Login */}
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white"
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit">Login</Button>

          <hr className="my-3 border-gray-300 dark:border-gray-600" />

          {/* Social Login */}
          <div className="flex flex-col gap-4 mb-6">
            <Button
              onClick={handleGoogleLogin}
              className="bg-white text-black dark:bg-black dark:text-white border-2"
            >
              Sign in with Google
            </Button>
          </div>
        </form>

        <p className="mt-6 text-center text-gray-600 dark:text-gray-300">
          Do not have an account?{" "}
          <Link href="/auth/register" className="text-primary font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
