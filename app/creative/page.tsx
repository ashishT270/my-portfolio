"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { content } from "../../data/content";
import Navbar from "../components/Navbar";
import ScrollReveal from "../components/ScrollReveal";

export default function CreativePage() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <main className="bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] min-h-screen text-black">

      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-10">

        <Link href="/" className="text-sm text-green-700 hover:underline mb-6 inline-block">
          ← Back to Home
        </Link>

        <ScrollReveal>
          <h1 className="text-4xl font-bold mb-6">{content.creativeBlog.title}</h1>
        </ScrollReveal>

        <div className="space-y-4 text-lg text-gray-800 leading-relaxed mb-10">
          {content.creativeBlog.content.map((para, i) => (
            <ScrollReveal key={i} delay={0.05 * i}>
              <p>{para}</p>
            </ScrollReveal>
          ))}
        </div>

        {/* IMAGES GRID */}
        <div className="grid md:grid-cols-2 gap-6">
          {content.creative.map((item, i) => (
            <ScrollReveal key={i} delay={0.08 * i}>
              <button
                className="w-full text-left group"
                onClick={() => setLightbox(item.image)}
                aria-label={`View ${item.title || "photo"} fullscreen`}
              >
                <div className="overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                  <img
                    src={item.image}
                    alt={item.title || "creative photo"}
                    loading="lazy"
                    className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                {item.title && (
                  <p className="mt-2 text-sm text-gray-700">{item.title}</p>
                )}
              </button>
            </ScrollReveal>
          ))}
        </div>

      </div>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center animate-fade-in"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-5 right-7 text-white text-3xl leading-none hover:text-gray-300 transition-colors"
            onClick={() => setLightbox(null)}
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <img
            src={lightbox}
            alt="Full size view"
            className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl animate-fade-up"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

    </main>
  );
}