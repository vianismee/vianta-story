import { Post } from "@/types";
import Image from "next/image";
import { TiptapRender } from "./tiptap-render";
import { BlogMatrix } from "./blog-matrix";

interface BlogLayoutParams {
  post: Post;
}

export function BlogLayout({ post }: BlogLayoutParams) {
  return (
    <main className="w-full flex flex-col mx-auto gap-6 items-center">
      <div className="w-full flex px-[100px] gap-5 justify-between">
        <h1 className="text-4xl">{post.title}</h1>
        <BlogMatrix postId={post.id} createdAt={post.created_at} />
      </div>
      <div className="relative w-4xl aspect-video">
        <Image
          src={post.header_image_url}
          alt={post.post_slug}
          fill
          className="object-cover rounded-2xl"
        />
      </div>
      <article className="w-full px-[150px]">
        <TiptapRender content={post.content} />
      </article>
    </main>
  );
}
