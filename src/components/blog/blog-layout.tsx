import { Post } from "@/types";
import Image from "next/image";
import { TiptapRender } from "./tiptap-render";
import { BlogMatrix } from "./blog-matrix";

interface BlogLayoutParams {
  post: Post;
}

export function BlogLayout({ post }: BlogLayoutParams) {
  return (
    // Gunakan padding horizontal untuk mobile (px-4) dan lebih besar untuk desktop (lg:px-8)
    <main className="w-full flex flex-col mx-auto gap-6 items-center px-4 py-8 lg:px-8">
      <div className="w-full max-w-4xl flex flex-col md:flex-row md:justify-between items-center gap-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center md:text-left">
          {post.title}
        </h1>
        <BlogMatrix postId={post.id} createdAt={post.created_at} />
      </div>
      <div className="relative w-full max-w-4xl aspect-video">
        <Image
          src={post.header_image_url}
          alt={post.post_slug}
          fill
          className="object-cover rounded-2xl"
        />
      </div>

      {/* Gunakan class 'prose' dari plugin @tailwindcss/typography untuk styling artikel otomatis.
        'prose' sudah responsif secara default dan meningkatkan keterbacaan.
        'max-w-4xl' menyamakan lebar artikel dengan gambar di atasnya.
      */}
      <article className="prose lg:prose-sm w-full max-w-4xl md:px-[50px]">
        <TiptapRender content={post.content} />
      </article>
    </main>
  );
}
