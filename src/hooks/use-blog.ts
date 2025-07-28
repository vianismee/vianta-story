'use client'

import { Post } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";

export function useBlog(slug?: string) {
    const [posts, setPosts] = useState<Post[]>([]);
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true); // Set loading true di awal
    const [error, setError] = useState<string | null>(null);

    // Gunakan useCallback agar fungsi ini tidak dibuat ulang di setiap render,
    // kecuali dependensinya berubah. Ini penting untuk stabilitas.
    const fetchBlogPost = useCallback(async () => {
        const supabase = createClient();
        setLoading(true);
        setError(null);

        try {
            if (slug) {
                // Fetch single post
                const { data, error } = await supabase
                    .from("blog_post")
                    .select("*")
                    .eq("post_slug", slug)
                    .single();
                
                if (error) throw error;
                setPost(data);
            } else {
                // Fetch all posts
                const { data, error: fetchError } = await supabase
                    .from("blog_post")
                    .select("*")
                    .order('created_at', { ascending: false });
                
                if (fetchError) throw fetchError;
                setPosts(data || []);
            }
        } catch (error) {
           
            console.error("Error fetching blog data:", error);
        } finally {
            setLoading(false);
        }
    }, [slug]); // useEffect akan memanggil ulang fungsi ini jika slug berubah

    useEffect(() => {
        fetchBlogPost();
    }, [fetchBlogPost]); // Jalankan fetchBlogPost saat komponen mount atau saat fungsi itu sendiri berubah (karena slug berubah)

    // Kembalikan fungsi fetchBlogPost sebagai refetchPosts, BUKAN hasil pemanggilannya.
    // Ini adalah perbaikan utama.
    return { posts, loading, error, post, refetchPosts: fetchBlogPost };
}
