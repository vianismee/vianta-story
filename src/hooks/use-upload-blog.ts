
import { JSONContent } from "@tiptap/react"
import { createClient } from "../../utils/supabase/client";
import imageCompression from "browser-image-compression";
import { useCallback, useState } from "react";

interface useUploadBlogProps {
    title: string
    content: JSONContent | null
    image: File | null
    category: JSONContent | null
}

const titleSlug = (title: string) => {
    if(!title) return "";
    return title.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');

}

export function useUploadBlog(){
    const [isLoading, setIsLoading] = useState(false)
    const uploadPost = useCallback(async ({title, content, image, category}: useUploadBlogProps) => {
        setIsLoading(true)

        const supabase = createClient()
        let headerImageUrl: string | null = null

        try {
            if(image){
                const options = {
                    maxSizeMB: 0.8,
                    maxWidthOrHeight: 1920,
                    useWebWorker: true, 
                }
                const compressedImage = await imageCompression(image, options);
                const safeFileName = compressedImage.name.replace(/[^a-zA-Z0-9.\-_]/g,"_")
                const fileName = `${safeFileName}_${Date.now()}`
                const imageBucket = "blog-images"

                const {data: uploadData, error: uploadError} = await supabase.storage.from(imageBucket).upload(fileName, compressedImage)
                if(uploadError) {
                    throw uploadError
                }
                const {data: getImageUrl} = await supabase.storage.from(imageBucket).getPublicUrl(uploadData.path)
                headerImageUrl = getImageUrl.publicUrl
            }
            const slug = titleSlug(title)
            const finalPostData = {
                title: title,
                post_slug: slug,
                content: content,
                header_image_url: headerImageUrl,
                category: category,
            }

            const {data: insertedData, error: insertedError} = await supabase.from("blog_post").insert([finalPostData]).single()

            if(insertedError){
                throw insertedError
            }
            return insertedData
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
        
    }, []);

    return {uploadPost, isLoading}
}