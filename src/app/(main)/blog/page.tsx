"use client";

import { useBlog } from "@/hooks/use-blog";
import Link from "next/link";
import Image from "next/image";
import { BlogCardSekeleton } from "@/components/blog/sekeleton/blog-card";

export default function BlogPages() {
  const { posts, loading, error } = useBlog();

  if (error) {
    return <div className="text-center p-10 text-red-500">Error: {error}</div>;
  }

  return (
    <main className="p-4 md:p-8 flex flex-col gap-8">
      <section className="flex flex-col md:flex-row items-start md:items-center justify-between w-full border-b-[3px] border-primary pb-8">
        <h1 className="text-4xl lg:text-6xl font-bold md:w-[50%]">
          Our Blog Story
        </h1>
        <p className="mt-4 md:mt-0 md:w-[40%] text-base md:text-xl md:border-l-[3px] border-primary/50 md:pl-4 font-medium">
          Ini adalah cerita perjalanan kami mengunjungi tempat atau destinasi
          menarik.
        </p>
      </section>
      {loading ? (
        <BlogCardSekeleton />
      ) : (
        <section className="flex flex-col md:flex-row gap-8 border-b-[3px] border-primary pb-8">
          {posts.slice(0, 2).map((post) => (
            <Link
              href={`/blog/${post.post_slug}`}
              key={post.id}
              // ✅ Card akan otomatis mengambil 50% lebar karena parent-nya flex-row
              className="w-full md:w-1/2 flex flex-col gap-4 group"
            >
              <div className="relative w-full aspect-video rounded-2xl bg-zinc-200 overflow-hidden">
                <Image
                  src={post.header_image_url}
                  alt={post.post_slug}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-115"
                />
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-primary/70 text-sm font-semibold">
                  Inspiration
                </h2>
                <h1 className="text-2xl md:text-3xl font-bold">{post.title}</h1>
              </div>
            </Link>
          ))}
        </section>
      )}

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link
            href={`/blog/${post.post_slug}`}
            key={post.id}
            className="flex flex-col gap-4 group"
          >
            <div className="relative w-full aspect-video rounded-2xl bg-zinc-200 overflow-hidden">
              <Image
                src={post.header_image_url}
                alt={post.post_slug}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-115"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-primary/70 text-sm font-semibold">Travel</h2>
              <h1 className="text-xl font-bold">{post.title}</h1>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
