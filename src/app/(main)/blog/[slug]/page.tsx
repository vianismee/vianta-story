"use client";

import { useBlog } from "@/hooks/use-blog";
import { use, useEffect } from "react";
import { createClient } from "../../../../utils/supabase/client";

export default function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { post, loading, error } = useBlog(slug);
  const supabase = createClient();

  useEffect(() => {
    const viewedKey = `viewed-${slug}`;
    const hasViewd = localStorage.getItem(viewedKey);

    const incrementView = async () => {
      try {
        if (!hasViewd) {
          const { error } = await supabase.rpc("increment_view_count", {
            post_slug_param: slug, // Nama parameter harus 'post_slug'
          });
          if (error) {
            console.log(error);
          }
          localStorage.setItem(viewedKey, "true");
        }
      } catch (error) {
        console.log(error);
      }
    };
    incrementView();
  }, [slug, supabase]);

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
