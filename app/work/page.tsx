import Link from "next/link";
import { content } from "../../data/content";
import Navbar from "../components/Navbar";
import ScrollReveal from "../components/ScrollReveal";
import { readingTime } from "../../lib/readingTime";

export default function WorkPage() {
  return (
    <main className="bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] min-h-screen text-black">

      <Navbar />

      <div className="max-w-4xl mx-auto px-8 py-10">

        <Link href="/" className="text-sm text-green-700 hover:underline mb-6 inline-block">
          ← Back to Home
        </Link>

        <ScrollReveal>
          <h1 className="text-4xl font-bold mb-2">My Work</h1>
        </ScrollReveal>
        <ScrollReveal delay={0.1}>
          <p className="text-gray-600 mb-12">
            Everything I write, explore, and create — technology, poetry, and visual art.
          </p>
        </ScrollReveal>

        {/* TECH BLOGS */}
        <section className="mb-14">
          <ScrollReveal>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">💻 Tech Blogs</h2>
              <Link href="/blogs" className="text-sm text-green-700 hover:underline">View all →</Link>
            </div>
          </ScrollReveal>
          <div className="space-y-4">
            {content.tech.map((blog, i) => (
              <ScrollReveal key={blog.slug} delay={0.1 * i}>
                <Link href={`/blogs/${blog.slug}`}>
                  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold">{blog.title}</h3>
                      {i === 0 && (
                        <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full shrink-0">Latest</span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm italic mb-2">{blog.desc}</p>
                    <p className="text-gray-700 text-sm line-clamp-2">{blog.content[0]}</p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm font-medium text-green-600">Read more →</span>
                      <span className="text-xs text-gray-400">{readingTime(blog.content)}</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* POETRY */}
        <section className="mb-14">
          <ScrollReveal>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">✍️ Poetry</h2>
              <Link href="/poetry" className="text-sm text-blue-700 hover:underline">View all →</Link>
            </div>
          </ScrollReveal>
          <div className="space-y-4">
            {content.poetry.map((poem, i) => (
              <ScrollReveal key={poem.slug} delay={0.1 * i}>
                <Link href={`/poetry/${poem.slug}`}>
                  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{poem.title}</h3>
                      {i === 0 && (
                        <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded-full shrink-0">Latest</span>
                      )}
                    </div>
                    <p className="text-gray-600 italic text-sm line-clamp-2">
                      {poem.content.filter((l) => l !== "").slice(0, 2).join(" / ")}
                    </p>
                    <div className="flex items-center justify-between mt-3">
                      <span className="text-sm font-medium text-blue-600">Read poem →</span>
                      <span className="text-xs text-gray-400">{readingTime(poem.content, 120)}</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>

        {/* CREATIVE */}
        <section className="mb-14">
          <ScrollReveal>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">🎨 Creative Space</h2>
              <Link href="/creative" className="text-sm text-pink-700 hover:underline">View all →</Link>
            </div>
          </ScrollReveal>
          <div className="grid md:grid-cols-3 gap-4">
            {content.creative.map((item, i) => (
              <ScrollReveal key={i} delay={0.08 * i}>
                <Link href="/creative">
                  <div className="rounded-2xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                    <img
                      src={item.image}
                      alt={item.title || "creative photo"}
                      loading="lazy"
                      className="w-full h-44 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}

