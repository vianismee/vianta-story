"use client";

import { useBlog } from "@/hooks/use-blog";
import Link from "next/link";

export default function BlogPages() {
  const { posts } = useBlog();

  return (
    <div>
      {posts.map((post) => (
        <Link href={`/blog/${post.post_slug}`} key={post.id}>
          <h1>{post.title}</h1>
        </Link>
      ))}
    </div>
  );
}
