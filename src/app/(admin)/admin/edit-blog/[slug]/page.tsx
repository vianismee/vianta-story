"use client";

import { useBlog } from "@/hooks/use-blog";
import { useParams, useRouter } from "next/navigation";
import { useEditBlog } from "@/hooks/use-edit-blog";
import { useEffect, useState } from "react";
import { JSONContent } from "@tiptap/react";
import { Option } from "@/components/ui/multiple-selector";
import { toast } from "sonner";
import Image from "next/image";
import InputDemo from "@/components/input-12";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import MultipleSelectorControlled from "../../create-blog/MultipleSelectorController";
import TextEditor from "@/components/text-editor";
import { Button } from "@/components/ui/button";

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;

  // Hooks
  const { post, loading: isLoadingPost } = useBlog(slug);
  const { updatePost, isUpdating } = useEditBlog();
  // Form States
  const [blogTitle, setBlogTitle] = useState("");
  const [blogContent, setBlogContent] = useState<JSONContent | undefined>(
    undefined
  );
  const [categories, setCategories] = useState<Option[]>([]);
  const [newBlogImage, setNewBlogImage] = useState<File | null>(null); // Untuk file gambar baru
  const [imagePreview, setImagePreview] = useState<string | null>(null); // Untuk preview (URL lama atau baru)

  // Efek untuk mengisi form setelah data post berhasil diambil
  useEffect(() => {
    if (post) {
      setBlogTitle(post.title);
      setBlogContent(post.content);
      setImagePreview(post.header_image_url);

      // Ubah string[] dari database menjadi Option[] untuk komponen
      if (post.categories) {
        setCategories(
          post.categories.map((cat) => ({ label: cat, value: cat }))
        );
      }
    }
  }, [post]);

  const handleFileChange = (file: File) => {
    setNewBlogImage(file);
    // Buat URL objek sementara untuk pratinjau gambar baru
    setImagePreview(URL.createObjectURL(file));
  };

  const handleUpdatePost = async () => {
    if (!post) return;

    try {
      const dataToUpdate = {
        id: post.id,
        title: blogTitle,
        content: blogContent!,
        category: categories.map((cat) => cat.value),
        newImage: newBlogImage,
        oldImage: post.header_image_url,
      };

      await updatePost(dataToUpdate);
      toast.success(`Blog "${blogTitle}" berhasil diperbarui`);
      router.push("/admin"); // Arahkan kembali ke dashboard admin
    } catch (error) {
      toast.error(
        `Gagal memperbarui: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  };

  if (isLoadingPost) {
    return <div>Loading post data...</div>;
  }

  if (!post) {
    return <div>Post not found.</div>;
  }

  return (
    <div className="w-full mx-auto flex flex-col gap-3">
      <div className="flex flex-col md:flex-row w-full gap-4">
        {/* Modifikasi InputDemo untuk bisa menampilkan gambar awal */}
        <div className="w-full aspect-video max-w-2xs">
          {/* Logika ini disederhanakan dan digabung dari komponen InputDemo */}
          {imagePreview ? (
            <div className="relative aspect-video">
              <button
                className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 z-10"
                onClick={() => {
                  setImagePreview(null);
                  setNewBlogImage(null);
                }}
              >
                {/* Icon X */}
              </button>
              <Image
                src={imagePreview}
                layout="fill"
                alt="Preview"
                className="object-cover rounded-md"
              />
            </div>
          ) : (
            <InputDemo onFileChange={handleFileChange} />
          )}
        </div>
        <div className="flex flex-col w-full gap-5">
          <div className="flex flex-col w-full gap-2">
            <Label className="text-xl font-bold">Judul Blog</Label>
            <Input
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              className="bg-white"
            />
          </div>
          <MultipleSelectorControlled
            value={categories}
            onChange={setCategories}
          />
        </div>
      </div>

      {/* Gunakan 'key' untuk memaksa Tiptap merender ulang dengan konten baru saat 'post' sudah ada.
        Ini adalah trik yang sangat efektif untuk komponen yang sulit di-update secara imperatif.
      */}
      {blogContent && (
        <TextEditor
          key={post.id}
          initialContent={blogContent}
          onChangeContent={(newContent) => {
            setBlogContent(newContent);
          }}
        />
      )}

      <Button onClick={handleUpdatePost} disabled={isUpdating}>
        {isUpdating ? "Updating..." : "Update Blog Post"}
      </Button>
    </div>
  );
}
