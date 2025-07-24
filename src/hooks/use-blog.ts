'use client'

import { Post } from "@/types";
import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";

export function useBlog(slug?: string) {
    const [posts, setPosts] = useState<Post[]>([])
    const [post, setPost] = useState<Post | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const fetchBlogPost = async () => {
          
            const supabase  = createClient()
            setLoading(true)
            setError(null)
      
            try {

                if(slug) {
                    const {data, error} = await supabase.from("blog_post").select("*").eq("post_slug", slug).single()
                    if(error) throw error
                    setPost(data)
                } else {
                    const {data, error: fetchError} = await supabase.from("blog_post").select("*").order('created_at', { ascending: false })
                    if(fetchError) {
                        console.log(fetchError)
                    } else {
                        setPosts(data || [])
                    }
                }
            } catch (error) {
              console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchBlogPost()
    }, [slug])
    return {posts, loading, error, post}
}