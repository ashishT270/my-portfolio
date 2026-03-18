"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { content } from "../data/content";
import Navbar from "./components/Navbar";
import ScrollReveal from "./components/ScrollReveal";
import Typewriter from "./components/Typewriter";

export default function Home() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % content.creative.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] text-black min-h-screen">

      <Navbar />

      {/* HERO */}
      <section className="relative grid md:grid-cols-2 items-center gap-12 px-8 py-20 overflow-hidden">

        {/* Blob accents */}
        <div className="absolute -top-16 -left-16 w-96 h-96 bg-green-300 rounded-full blur-3xl opacity-30 pointer-events-none" />
        <div className="absolute top-10 right-0 w-72 h-72 bg-teal-200 rounded-full blur-3xl opacity-25 pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 w-60 h-60 bg-emerald-200 rounded-full blur-3xl opacity-20 pointer-events-none" />

        <div className="relative">
          <h1 className="text-5xl font-bold leading-tight animate-fade-up">
            <Typewriter text="Hi, I'm Ashish 👋" />
          </h1>

          <p className="mt-6 text-gray-700 text-lg animate-fade-up" style={{ animationDelay: "1.5s" }}>
            I write about technology, poetry, and life.
            Exploring both systems and soul.
          </p>

          <Link href="/work">
            <button className="mt-6 px-7 py-3 bg-[#3DDC84] text-black rounded-xl hover:scale-105 hover:shadow-lg transition-all duration-300 font-medium animate-fade-up" style={{ animationDelay: "1.8s" }}>
              Explore My Work
            </button>
          </Link>
        </div>

        <div className="relative flex justify-center">
          <img
            src="/profile.jfif"
            alt="Ashish"
            loading="lazy"
            className="rounded-2xl w-80 h-80 object-cover shadow-xl ring-4 ring-white/50 animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          />
        </div>

      </section>

      {/* CARDS */}
      <section className="grid md:grid-cols-3 gap-8 items-stretch px-8">

        {/* POETRY */}
        <ScrollReveal delay={0} className="flex flex-col h-full">
          <div className="h-full min-h-[320px] bg-gradient-to-br from-blue-200 to-blue-400 p-8 rounded-2xl shadow-md flex flex-col">

            <h2 className="text-xl font-semibold mb-4">Poetry ✍️</h2>

            {content.poetry.slice(0, 2).map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center gap-2">
                  <Link href={`/poetry/${item.slug}`}>
                    <p className="font-medium hover:underline cursor-pointer">{item.title}</p>
                  </Link>
                  {index === 0 && (
                    <span className="text-xs bg-blue-600 text-white px-2 py-0.5 rounded-full shrink-0">Latest</span>
                  )}
                </div>
                <p className="text-sm text-gray-800 italic line-clamp-2">{item.content[0]}</p>
              </div>
            ))}

            <Link href="/poetry" className="mt-auto">
              <p className="text-sm font-medium hover:underline cursor-pointer">Read more →</p>
            </Link>

          </div>
        </ScrollReveal>

        {/* TECH */}
        <ScrollReveal delay={0.12} className="flex flex-col h-full">
          <div className="h-full min-h-[320px] bg-gradient-to-br from-purple-200 to-purple-400 p-8 rounded-2xl shadow-md flex flex-col">

            <h2 className="text-xl font-semibold mb-4">Tech Insights 💻</h2>

            {content.tech.slice(0, 2).map((item, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center gap-2">
                  <Link href={`/blogs/${item.slug}`}>
                    <p className="font-medium hover:underline cursor-pointer">{item.title}</p>
                  </Link>
                  {index === 0 && (
                    <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full shrink-0">Latest</span>
                  )}
                </div>
                <p className="text-sm text-gray-800 line-clamp-2">{item.content[0]}</p>
              </div>
            ))}

            <Link href="/blogs" className="mt-auto">
              <p className="text-sm font-medium hover:underline cursor-pointer">Read more →</p>
            </Link>

          </div>
        </ScrollReveal>

        {/* CREATIVE */}
        <ScrollReveal delay={0.24} className="flex flex-col h-full">
          <div className="h-full min-h-[320px] bg-gradient-to-br from-pink-200 to-pink-400 p-8 rounded-2xl shadow-md flex flex-col">

            <h2 className="text-xl font-semibold mb-2">Creative Space 🎨</h2>

            <div className="flex items-center gap-2">
              <Link href="/creative">
                <h3 className="font-semibold text-lg hover:underline cursor-pointer">
                  {content.creativeBlog.title}
                </h3>
              </Link>
              <span className="text-xs bg-pink-600 text-white px-2 py-0.5 rounded-full shrink-0">Latest</span>
            </div>

            <p className="text-sm text-gray-800 mt-1 line-clamp-2">{content.creativeBlog.content[0]}</p>

            <img
              src={content.creative[current].image}
              alt="creative"
              loading="lazy"
              className="rounded-xl h-32 w-full object-cover mt-3 transition-opacity duration-500"
            />

            <div className="flex gap-1 mt-2">
              {content.creative.map((_, i) => (
                <div
                  key={i}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    i === current ? "bg-black scale-125" : "bg-gray-400"
                  }`}
                />
              ))}
            </div>

            <Link href="/creative" className="mt-auto">
              <p className="text-sm font-medium hover:underline cursor-pointer">View story →</p>
            </Link>

          </div>
        </ScrollReveal>

      </section>

      {/* CONTACT */}
      <ScrollReveal delay={0}>
        <section className="text-center mt-20 pb-16 px-8">
          <h2 className="text-2xl font-bold">Work with me</h2>
          <p className="text-gray-600 mt-2">Have an idea or a project? Let's connect.</p>

          <a
            href="https://www.linkedin.com/in/ashish-kumar-thakur-473072119/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button className="mt-6 px-8 py-3 bg-[#3DDC84] text-black rounded-xl hover:bg-green-400 hover:scale-105 transition-all duration-300 font-medium shadow-md">
              Contact Me
            </button>
          </a>
        </section>
      </ScrollReveal>

    </main>
  );
}
