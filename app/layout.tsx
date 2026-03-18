import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ashish | Portfolio",
  description: "Personal portfolio of Ashish — tech, poetry, and creative work.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <footer className="text-center text-xs text-gray-500 py-6 border-t border-gray-200 bg-white">
          © {new Date().getFullYear()} Ashish. All rights reserved. All content, writings, and images on this site are the intellectual property of the author and may not be reproduced without permission.
        </footer>
      </body>
    </html>
  );
}
