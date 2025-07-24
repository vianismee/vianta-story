"use client";
import TextEditor from "@/components/text-editor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import MultipleSelectorControlled from "./MultipleSelectorController";
import { JSONContent } from "@tiptap/react";
import { createClient } from "../../../../../utils/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import InputDemo from "@/components/input-12";
import imageCompression from "browser-image-compression";

const initialContent: JSONContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
    },
  ],
};

export default function CreateBlogPage() {
  const [blogTitle, setBlogTittle] = useState("");
  const [blogContent, setBlogContent] = useState<JSONContent>(initialContent);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // image file handler
  const [blogImage, setBlogImage] = useState<File | null>(null);
  const [blogImagePrev, setBlogImagePrev] = useState<string | null>(null);

  const handleFileChange = (file: File) => {
    setBlogImage(file);
    // Buat URL objek sementara untuk pratinjau
    setBlogImagePrev(URL.createObjectURL(file));
  };

  const handleFileRemove = () => {
    setBlogImage(null);
    if (blogImagePrev) {
      // Penting: Hapus URL objek untuk menghindari memory leak
      URL.revokeObjectURL(blogImagePrev);
    }
    setBlogImagePrev(null);
  };

  const handleSubmitePost = async () => {
    setIsUploading(true);
    const supabase = createClient();

    let headerImageUrl: string | null = null;

    try {
      if (blogImage) {
        const options = {
          maxSizeMB: 0.9,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedImage = await imageCompression(blogImage, options);
        const safeFileName = compressedImage.name.replace(
          /[^a-zA-Z0-9.\-_]/g,
          "_"
        );
        const filename = `${Date.now()}_${safeFileName}`;
        const imageBucket = "blog-images";
        const { data: uploadData, error } = await supabase.storage
          .from(imageBucket)
          .upload(filename, blogImage);
        if (error) {
          throw new Error(`Gagal mengunggah gambar: ${error.message}`);
        }

        const { data: publicUrlData } = await supabase.storage
          .from(imageBucket)
          .getPublicUrl(uploadData.path);

        headerImageUrl = publicUrlData.publicUrl;
      }
      const generateSlug = (title: string): string => {
        if (!title) {
          return "";
        }

        return (
          title
            .toString()
            .toLowerCase()
            // 1. Ganti spasi dengan tanda hubung (-)
            .replace(/\s+/g, "-")
            // 2. Hapus semua karakter yang bukan huruf, angka, atau tanda hubung
            .replace(/[^\w\-]+/g, "")
            // 3. Ganti beberapa tanda hubung berturut-turut menjadi satu saja
            .replace(/\-\-+/g, "-")
            // 4. Hapus tanda hubung yang mungkin ada di awal teks
            .replace(/^-+/, "")
            // 5. Hapus tanda hubung yang mungkin ada di akhir teks
            .replace(/-+$/, "")
        );
      };

      const slug = generateSlug(blogTitle);
      const finalPostedData = {
        title: blogTitle,
        post_slug: slug,
        content: blogContent,
        header_image_url: headerImageUrl,
      };
      const { error } = await supabase
        .from("blog_post")
        .insert([finalPostedData])
        .select();
      if (error) {
        console.log(error);
      } else {
        toast.success(`Blog ${blogTitle} Masuk Draft`);
        handleFileRemove();
        setBlogTittle("");
        setBlogContent(initialContent);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full mx-auto flex flex-col gap-3">
      <div className="flex flex-col md:flex-row w-full gap-4">
        <InputDemo onFileChange={handleFileChange} />
        <div className="flex flex-col w-full gap-5">
          <div className="flex flex-col w-full gap-2">
            <Label className="text-xl font-bold">Judul Blog</Label>
            <Input
              placeholder="Review Kopi Paling Asik di Malang..."
              className="bg-white"
              onChange={(e) => setBlogTittle(e.target.value)}
            />
          </div>
          <MultipleSelectorControlled />
        </div>
      </div>
      <TextEditor
        initialContent={initialContent}
        onChangeContent={(newContent) => {
          setBlogContent(newContent);
        }}
      />
      <Button onClick={handleSubmitePost}>Add Blog Post</Button>
    </div>
  );
}
