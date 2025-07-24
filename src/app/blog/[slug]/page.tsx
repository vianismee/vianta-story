"use client";

import { useBlog } from "@/hooks/use-blog";
import { use } from "react";

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const { post, loading, error } = useBlog(slug);
  if (loading) {
    return <div className="text-center p-10">Memuat postingan...</div>;
  }
  if (error) {
    return <div className="text-center p-10 text-red-500">Error: {error}</div>;
  }
  if (!post) {
    return (
      <div className="text-center p-10">404 | Postingan tidak ditemukan.</div>
    );
  }
  return (
    <div>
      <p>{post.title}</p>
    </div>
  );
}
