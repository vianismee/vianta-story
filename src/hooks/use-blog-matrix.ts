import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";
import { PostMatrix } from "@/types";




export function useBlogMatrix(postId: number){
    const [viewCount, setViewCount] = useState<PostMatrix | null>(null)

    useEffect(() => {
      const fetchViewCount = async() => {
        const supabase = createClient()

        try {
            const {data, error} = await supabase.from("post_metrics").select("*").eq("post_id", postId).single()
            if(error) {
                console.log(error)
            } setViewCount(data)
        } catch (error) {
            console.log(error)
        }
      }
      fetchViewCount()
    }, [postId])

    return {viewCount}
}