import Link from "next/link";
import { content } from "../../data/content";
import Navbar from "../components/Navbar";
import ScrollReveal from "../components/ScrollReveal";
import { readingTime } from "../../lib/readingTime";

export default function BlogsPage() {
  return (
    <main className="bg-gradient-to-br from-[#E8F5E9] to-[#C8E6C9] min-h-screen text-black">

      <Navbar />

      <section className="max-w-3xl mx-auto px-8 py-12">

        <ScrollReveal>
          <h1 className="text-4xl font-bold mb-2">Tech Insights 💻</h1>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <p className="text-gray-600 mb-10">Deep dives into Android, systems, and software.</p>
        </ScrollReveal>

        <div className="space-y-6">
          {content.tech.map((blog, i) => (
            <ScrollReveal key={blog.slug} delay={0.1 + i * 0.1}>
              <Link href={`/blogs/${blog.slug}`}>
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-semibold">{blog.title}</h2>
                    {i === 0 && (
                      <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full shrink-0">Latest</span>
                    )}
                  </div>
                  <p className="text-gray-500 text-sm italic mb-3">{blog.desc}</p>
                  <p className="text-gray-700 text-sm line-clamp-2">{blog.content[0]}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm font-medium text-green-600">Read more →</span>
                    <span className="text-xs text-gray-400">{readingTime(blog.content)}</span>
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
