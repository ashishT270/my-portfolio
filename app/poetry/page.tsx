import Link from "next/link";
import { content } from "../../data/content";
import Navbar from "../components/Navbar";
import ScrollReveal from "../components/ScrollReveal";
import { readingTime } from "../../lib/readingTime";

export default function PoetryListPage() {
  return (
    <main className="bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] min-h-screen text-black">

      <Navbar />

      <section className="max-w-3xl mx-auto px-8 py-12">

        <ScrollReveal>
          <h1 className="text-4xl font-bold mb-2">Poetry ✍️</h1>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-gray-600 mb-10">Words from the heart. Thoughts from the soul.</p>
        </ScrollReveal>

        <div className="space-y-6">
          {content.poetry.map((poem, i) => (
            <ScrollReveal key={poem.slug} delay={0.1 + i * 0.1}>
              <Link href={`/poetry/${poem.slug}`}>
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-2 mb-3">
                    <h2 className="text-xl font-semibold">{poem.title}</h2>
                    {i === 0 && (
                      <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full shrink-0">Latest</span>
                    )}
                  </div>
                  <p className="text-gray-600 italic text-sm line-clamp-2">
                    {poem.content.filter((l) => l !== "").slice(0, 2).join(" / ")}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm font-medium text-blue-600">Read poem →</span>
                    <span className="text-xs text-gray-400">{readingTime(poem.content, 120)}</span>
                  </div>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>

      </section>

    </main>
  );
}
