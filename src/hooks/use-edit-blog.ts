import { JSONContent } from '@tiptap/react';
import { useCallback, useState } from 'react';
import { createClient } from '../../utils/supabase/client';
import imageCompression from "browser-image-compression";



interface useEditBlogProps {
    id: number
    title: string
    content: JSONContent | null
    category: string[]
    newImage: File | null
    oldImage: string
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

export function useEditBlog(){
    const [isUpdating, setIsUpdating] = useState<boolean>(false)

    const updatePost = useCallback(async ({id, category, content, newImage, oldImage, title, }: useEditBlogProps) => {
      setIsUpdating(true)
      const supabase = createClient()
      let headerImageUrl = oldImage

      try {
        if (newImage){
            if(oldImage){
                const imagePath = oldImage.split("/").pop();
                if(imagePath) {
                    await supabase.storage.from("blog-images").remove([imagePath])
                }
            }
            const options = {
                maxSizeMB: 0.8,
                maxWidthOrHeight: 1920,
                useWebWorker: true
            }
            const compressedImage = await imageCompression(newImage, options)
            const safeFileName = compressedImage.name.replace(/[^a-zA-Z0-9.\-_]/g, "_")
            const fileName = `${safeFileName}_${Date.now()}`
            const imageBucket = "blog-images"

            const {data: uploadData, error: uploadError} = await supabase.storage.from(imageBucket).upload(fileName, compressedImage);

            if(uploadError) throw uploadError;

            const {data: getImageUrl} = supabase.storage.from(imageBucket).getPublicUrl(uploadData.path)
            headerImageUrl = getImageUrl.publicUrl
        }

        const slug = titleSlug(title)
        const finalPostData = {
            title,
            post_slug: slug,
            content,
            header_image_url: headerImageUrl,
            category,
        }

        const {data: updateData,error: updateError} = await supabase.from("blog_post").update(finalPostData).eq("id", id).single()

        if(updateError) throw updateError
        return updateData

      } catch (error) {
        console.error(error)
      } finally {
        setIsUpdating(false)
      }
    },[])

    return {updatePost, isUpdating}
}