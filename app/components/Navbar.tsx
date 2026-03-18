"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/blogs", label: "Blogs" },
  { href: "/poetry", label: "Poetry" },
  { href: "/creative", label: "Creative" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav
      className={`sticky top-0 z-50 flex justify-between items-center px-8 py-5 transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <Link href="/" className="text-xl font-bold tracking-tight">
        MySpace
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex space-x-6 text-gray-700">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={`transition-colors pb-0.5 hover:text-black ${
              isActive(href)
                ? "text-black font-semibold border-b-2 border-green-500"
                : ""
            }`}
          >
            {label}
          </Link>
        ))}
      </div>

      {/* Hamburger button */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2 z-50"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle navigation menu"
      >
        <span
          className={`block h-0.5 w-6 bg-gray-700 transition-transform duration-300 ${
            menuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-gray-700 transition-opacity duration-300 ${
            menuOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-gray-700 transition-transform duration-300 ${
            menuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        />
      </button>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg py-5 flex flex-col items-center gap-5 transition-all duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMenuOpen(false)}
            className={`text-lg ${
              isActive(href) ? "font-semibold text-black" : "text-gray-600"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
