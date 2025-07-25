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
    <div className="w-full max-w-4xl mx-auto p-4">
      {/* Gunakan grid untuk layout yang rapi */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Loop melalui data posts untuk membuat card */}
        {posts.map((post) => (
          <Link
            href={`/blog/${post.post_slug}`}
            key={post.id}
            className="group"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden h-full transition-transform duration-300 hover:scale-105">
              {/* Wadah untuk gambar dengan aspek rasio 16/9 */}
              <div className="relative w-full aspect-[16/9] bg-gray-200">
                <Image
                  // Gunakan URL gambar dari data post
                  src={post.header_image_url}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Konten teks di bawah gambar */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(post.created_at).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
