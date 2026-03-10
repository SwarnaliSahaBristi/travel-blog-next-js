"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.ok) {
      alert("Login Successful!");
      router.push(callbackUrl);
    } else {
      alert("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 px-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow p-8">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Login to TravelStory
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="px-4 py-2 rounded-md border"
            required
          />

          <div className="relative">

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md border"
              required
            />

            <span
              onClick={()=>setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 cursor-pointer"
            >
              {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
            </span>

          </div>

          <Button type="submit">Login</Button>

          <hr />

          <Button
            type="button"
            onClick={handleGoogleLogin}
            className="bg-white text-black border"
          >
            Sign in with Google
          </Button>

        </form>

        <p className="mt-6 text-center">
          Do not have an account?{" "}
          <Link href="/auth/register" className="font-semibold">
            Register
          </Link>
        </p>

      </div>
    </div>
  );
}