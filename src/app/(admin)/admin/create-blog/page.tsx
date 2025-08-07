"use client";
import TextEditor from "@/components/text-editor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import MultipleSelectorControlled from "./MultipleSelectorController";
import { JSONContent } from "@tiptap/react";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import InputDemo from "@/components/input-12";

import { useUploadBlog } from "@/hooks/use-upload-blog";
import { Option } from "@/components/ui/multiple-selector";

const initialContent: JSONContent = {
  type: "doc",
  content: [
    {
      type: "paragraph",
    },
  ],
};

export default function CreateBlogPage() {
  const { uploadPost } = useUploadBlog();

  const [blogTitle, setBlogTittle] = useState("");
  const [blogContent, setBlogContent] = useState<JSONContent>(initialContent);
  const [blogCategory, setBlogCategory] = useState<Option[]>([]);

  console.log(blogCategory);

  // image file handler
  const [blogImage, setBlogImage] = useState<File | null>(null);
  const [blogImagePrev, setBlogImagePrev] = useState<string | null>(null);

  const handleFileChange = (file: File) => {
    setBlogImage(file);
    setBlogImagePrev(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setBlogTittle("");
    setBlogContent(initialContent); // Reset editor (perlu penyesuaian di TextEditor)
    if (blogImagePrev) URL.revokeObjectURL(blogImagePrev);
    setBlogImage(null);
    setBlogImagePrev(null);
    setBlogCategory([]);
  };
  const handleSubmitePost = async () => {
    try {
      const dataToUpload = {
        title: blogTitle,
        content: blogContent,
        image: blogImage,
        category: blogCategory,
      };
      const newPost = await uploadPost(dataToUpload);
      toast.success(`Blog ${blogTitle} berhasil di Upload`);
      resetForm();
      return newPost;
    } catch (error) {
      toast.error(`Gagal menyimpan: ${error}`);
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
          <MultipleSelectorControlled
            value={blogCategory}
            onChange={setBlogCategory}
          />
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
