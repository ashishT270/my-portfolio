import Link from "next/link";
import { content } from "../../../data/content";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import { readingTime } from "../../../lib/readingTime";
import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const poem = content.poetry.find((item) => item.slug === slug);
  if (!poem) return {};
  return {
    title: `${poem.title} | Ashish — Poetry`,
    description: poem.content.filter((l) => l !== "").slice(0, 3).join(" "),
  };
}

export default async function PoetryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const poem = content.poetry.find((item) => item.slug === slug);

  if (!poem) return notFound();

  const readTime = readingTime(poem.content, 120);

  return (
    <main className="min-h-screen bg-[#F9FAFB] text-black">

      <Navbar />

      {/* HERO HEADER */}
      <div className="bg-gradient-to-br from-blue-100 to-blue-300 px-8 py-16 animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <Link href="/poetry" className="text-sm text-blue-700 hover:underline mb-4 inline-block">
            ← Back to Poetry
          </Link>
          <h1
            className="text-4xl font-bold mt-2 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            {poem.title}
          </h1>
          <p
            className="text-blue-600 text-sm mt-2 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {readTime}
          </p>
        </div>
      </div>

      {/* POEM CONTENT */}
      <div className="max-w-3xl mx-auto px-8 py-12">
        <div className="space-y-1 text-lg leading-loose text-gray-800 font-serif italic">
          {poem.content.map((line, i) => (
            <div
              key={i}
              className="animate-fade-up"
              style={{ animationDelay: `${0.3 + i * 0.05}s` }}
            >
              {line === "" ? <br /> : <p>{line}</p>}
            </div>
          ))}
        </div>
      </div>

    </main>
  );
}
