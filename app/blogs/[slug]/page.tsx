import Link from "next/link";
import { content } from "../../../data/content";
import type { RichBlock } from "../../../data/content";
import { notFound } from "next/navigation";
import Navbar from "../../components/Navbar";
import { readingTime } from "../../../lib/readingTime";
import type { Metadata } from "next";

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const blog = content.tech.find((item) => item.slug === slug);
  if (!blog) return {};
  return {
    title: `${blog.title} | Ashish`,
    description: blog.desc,
  };
}

function RenderRichBlock({ block, index }: { block: RichBlock; index: number }) {
  const delay = `${0.3 + index * 0.06}s`;
  switch (block.type) {
    case "heading":
      return (
        <h2 className="text-2xl font-bold mt-10 mb-3 text-gray-900 animate-fade-up" style={{ animationDelay: delay }}>
          {block.value}
        </h2>
      );
    case "subheading":
      return (
        <h3 className="text-xl font-semibold mt-6 mb-2 text-gray-800 animate-fade-up" style={{ animationDelay: delay }}>
          {block.value}
        </h3>
      );
    case "text":
      return (
        <p className="text-lg leading-relaxed text-gray-700 animate-fade-up" style={{ animationDelay: delay }}>
          {block.value}
        </p>
      );
    case "list":
      return (
        <ul className="space-y-2 pl-2 animate-fade-up" style={{ animationDelay: delay }}>
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-gray-700 text-base leading-relaxed">
              <span className="text-purple-500 mt-1 shrink-0">▸</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case "diagram":
      return (
        <div className="animate-fade-up my-2" style={{ animationDelay: delay }}>
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-500 mb-2">{block.title}</p>
          <pre className="bg-gray-900 text-green-400 text-sm rounded-xl p-6 overflow-x-auto font-mono leading-relaxed whitespace-pre">
            {block.lines.join("\n")}
          </pre>
        </div>
      );
    case "note":
      return (
        <div className="animate-fade-up border-l-4 border-purple-400 bg-purple-50 rounded-r-xl px-5 py-4 text-gray-700 text-base leading-relaxed" style={{ animationDelay: delay }}>
          {block.value}
        </div>
      );
  }
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const blog = content.tech.find((item) => item.slug === slug);

  if (!blog) return notFound();

  const readTime = readingTime(blog.content);
  const hasRichContent = "richContent" in blog && Array.isArray(blog.richContent);

  return (
    <main className="min-h-screen bg-[#F9FAFB] text-black">

      <Navbar />

      {/* HERO HEADER */}
      <div className="bg-gradient-to-br from-purple-100 to-purple-300 px-8 py-16 animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <Link href="/blogs" className="text-sm text-purple-700 hover:underline mb-4 inline-block">
            ← Back to Blogs
          </Link>
          <h1
            className="text-4xl font-bold mt-2 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            {blog.title}
          </h1>
          <div
            className="flex items-center gap-4 mt-3 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            <p className="text-purple-800 italic text-lg">{blog.desc}</p>
            <span className="text-purple-600 text-sm whitespace-nowrap">{readTime}</span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-8 py-12 space-y-6">
        {hasRichContent
          ? (blog as typeof blog & { richContent: RichBlock[] }).richContent.map((block, i) => (
              <RenderRichBlock key={i} block={block} index={i} />
            ))
          : blog.content.map((para, i) => (
              <p
                key={i}
                className="text-lg leading-relaxed text-gray-700 animate-fade-up"
                style={{ animationDelay: `${0.3 + i * 0.1}s` }}
              >
                {para}
              </p>
            ))
        }
      </div>

    </main>
  );
}