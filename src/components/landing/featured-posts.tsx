"use client";

import { useBlog } from "@/hooks/use-blog";
import Link from "next/link";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

export function FeaturedPosts() {
  const { posts, loading } = useBlog();

  return (
    <section className="py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Featured Stories
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Dive into our latest adventures and discoveries from cozy corners
            around the world
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="w-full aspect-video rounded-2xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(0, 3).map((post) => (
              <Link
                href={`/blog/${post.post_slug}`}
                key={post.id}
                className="group cursor-pointer"
              >
                <article className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={post.header_image_url}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full">
                        Travel
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(post.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Discover the story behind this amazing adventure and the
                      memories we made along the way.
                    </p>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/blog">
           
          </Link>
        </div>
      </div>
    </section>
  );
}