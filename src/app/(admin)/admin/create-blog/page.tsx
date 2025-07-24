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

  const handleSubmitePost = async () => {
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
      slug: slug,
      content: blogContent,
    };

    const supabase = createClient();

    try {
      const { error } = await supabase
        .from("blog_post")
        .insert([finalPostedData])
        .select();
      if (error) {
        console.log(error);
      } else {
        toast.success(`Blog ${blogTitle} Masuk Draft`);
      }
    } catch (error) {
      console.error("Terjadi kesalahan tak terduga:", error);
    }
  };

  return (
    <div className="w-full mx-auto flex flex-col gap-3">
      <div className="flex flex-col w-full gap-2">
        <Label className="text-xl font-bold">Judul Blog</Label>
        <Input
          placeholder="Review Kopi Paling Asik di Malang..."
          className="bg-white"
          onChange={(e) => setBlogTittle(e.target.value)}
        />
      </div>
      <MultipleSelectorControlled />
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
