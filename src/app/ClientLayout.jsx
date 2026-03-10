// ClientLayout.jsx
"use client";
import { useState, useEffect } from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import Navbar from "@/components/Home/Navbar/Navbar";
import Footer from "@/components/Home/Footer/Footer";
import NextAuthProvider from "@/provider/NextAuthProvider";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);
  const [currentPath, setCurrentPath] = useState(pathname);

  useEffect(() => {
    if (pathname !== currentPath) {
      setLoading(true);
      const timer = setTimeout(() => {
        setCurrentPath(pathname);
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [pathname, currentPath]);

  return (
    <NextAuthProvider>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <Player
            autoplay
            loop
            src="https://assets9.lottiefiles.com/packages/lf20_usmfx6bp.json"
            style={{ height: 150, width: 150 }}
          />
        </div>
      )}
      <header><Navbar /></header>
      <main>{children}</main>
      <footer><Footer /></footer>
    </NextAuthProvider>
  );
}