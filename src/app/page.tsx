"use client";

import { useBlog } from "@/hooks/use-blog";

export default function Home() {
  const { posts } = useBlog();
  console.log(posts);
  return (
    <div className="max-w-3xl mx-auto">
      <div>
        {posts.map((post) => (
          <h1 key={post.id}>{post.title}</h1>
        ))}
      </div>
    </div>
  );
}
