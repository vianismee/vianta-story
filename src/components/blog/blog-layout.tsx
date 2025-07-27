import { Post } from "@/types";
import Blockquote from "@tiptap/extension-blockquote";
import StarterKit from "@tiptap/starter-kit";
import Image from "next/image";
import { generateHTML } from "@tiptap/html";

interface BlogLayoutParams {
  post: Post;
}

export function BlogLayout({ post }: BlogLayoutParams) {
  const extension = [StarterKit, Blockquote];
  const content = generateHTML(post.content, extension);
  console.log(content);
  return (
    <main className="w-full flex flex-col mx-auto gap-6 items-center">
      <h1 className="text-4xl">{post.title}</h1>
      <div className="relative w-4xl aspect-video">
        <Image
          src={post.header_image_url}
          alt={post.post_slug}
          fill
          className="object-cover rounded-2xl"
        />
      </div>
    </main>
  );
}
