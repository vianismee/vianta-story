"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import { useBlog } from "@/hooks/use-blog";
import { Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import { createClient } from "../../../utils/supabase/client";
import { toast } from "sonner";

export function HomeLayout() {
  const { posts, refetchPosts, loading } = useBlog();

  const handleDeletePost = async (img: string, id: number) => {
    const supabase = createClient();

    try {
      const imagePath = img.split("/").pop();
      if (imagePath) {
        const { error } = await supabase.storage
          .from("blog-images")
          .remove([imagePath]);
        if (error) {
          console.log(error.message);
        }
      }
      const { error: DeletePost } = await supabase
        .from("blog_post")
        .delete()
        .eq("id", id);

      if (DeletePost) {
        console.log(DeletePost);
      }
      toast.success("Berhasil menghapus Post");
      refetchPosts();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="w-full px-3 flex flex-col gap-5">
      <div>
        <Link href={"/admin/create-blog"}>
          <Button>Add Blog</Button>
        </Link>
      </div>
      {loading ? (
        <div>Masih Loading</div>
      ) : (
        <div>
          {posts.map((post) => (
            <div
              className="w-full px-4 py-4 rounded-[20px] bg-white border-2 border-primary flex justify-between items-center gap-5"
              key={post.id}
            >
              <div className="relative overflow-hidden h-[100px] aspect-video bg-zinc-300 rounded-[10px]">
                <Image
                  src={post.header_image_url}
                  alt={post.post_slug}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-115"
                />
              </div>
              <div className="flex w-[50%]">
                <h1>{post.title}</h1>
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/edit-blog/${post.post_slug}`}>
                  <Button size="icon">
                    <Edit />
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDeletePost(post.header_image_url, post.id);
                  }}
                >
                  <Trash2 /> Delete Blog
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
