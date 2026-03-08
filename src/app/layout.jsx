import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Footer from "@/components/Home/Footer/Footer";
import Navbar from "@/components/Home/Navbar/Navbar";
import NextAuthProvider from "@/provider/NextAuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Travel Story",
  description:
    "Find destinations, share travel experiences, and create your own travel stories in one place.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextAuthProvider>
          <header>
            <Navbar></Navbar>
          </header>
          <main>{children}</main>
          <footer>
            <Footer></Footer>
          </footer>
        </NextAuthProvider>
      </body>
    </html>
  );
}
