"use client";

import { useBlog } from "@/hooks/use-blog"; // Pastikan path hook sudah benar
import Link from "next/link";
import Image from "next/image"; // Gunakan komponen Image dari Next.js untuk optimasi

export default function BlogPages() {
  // Panggil hook untuk mendapatkan data dan statusnya
  const { posts, loading, error } = useBlog();

  // Tampilkan pesan loading saat data sedang diambil
  if (loading) {
    return <div className="text-center p-10">Memuat postingan...</div>;
  }

  // Tampilkan pesan error jika terjadi kesalahan
  if (error) {
    return <div className="text-center p-10 text-red-500">Error: {error}</div>;
  }

  return (
    <main className="p-4 flex flex-col gap-5">
      <section className="flex items-center justify-between w-full border-b-[3px] border-primary pb-6">
        <h1 className="text-[40pt] w-[40%]">Our Blog Story</h1>
        <p className="w-[30%] text-[16pt] border-l-[3px] border-primary/50 pl-4 font-medium">
          Ini adalah cerita perjalanan kami mengunjungi tempat atau destinasi
          menarik
        </p>
      </section>
      <section className="flex gap-5">
        {posts.slice(0, 2).map((post) => (
          <Link
            href={`/blog/${post.post_slug}`}
            key={post.id}
            className="w-[50%] flex flex-col gap-4"
          >
            <div className="relative w-full aspect-video rounded-2xl bg-zinc-500 overflow-hidden hover:group">
              <Image
                src={post.header_image_url}
                alt={post.post_slug}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-primary/50">test</h2>
              <h1 className="text-4xl">{post.title}</h1>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
