"use client";

import { cn } from "@/lib/utils";
import { ImageIcon, XCircleIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Dropzone from "react-dropzone";

interface ImageSelectorProps {
  onFileChange: (file: File) => void;
  isUploading?: boolean; // Opsional, untuk menampilkan loading dari induk
}

const ImagePreview = ({
  url,
  onRemove,
}: {
  url: string;
  onRemove: () => void;
}) => (
  // Diubah dari aspect-square
  <div className="relative aspect-video">
    <button
      className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
      onClick={onRemove}
    >
      <XCircleIcon className="h-5 w-5 fill-primary text-primary-foreground" />
    </button>
    <Image
      src={url}
      height={500}
      width={500}
      alt=""
      className="border border-border h-full w-full rounded-md object-cover"
    />
  </div>
);

export default function InputDemo({
  onFileChange,
  isUploading = false,
}: ImageSelectorProps) {
  const [blogPostImage, setBlogPotImage] = useState<string | null>(null);

  return (
    <div className="w-full aspect-video max-w-2xs">
      <div className="mt-1 w-full aspect-video">
        {blogPostImage ? (
          <ImagePreview
            url={blogPostImage}
            onRemove={() => setBlogPotImage(null)}
          />
        ) : (
          <Dropzone
            onDrop={(acceptedFiles) => {
              const file = acceptedFiles[0];
              if (file) {
                const imageUrl = URL.createObjectURL(file);
                setBlogPotImage(imageUrl);
                onFileChange(file);
              }
            }}
            accept={{
              "image/png": [".png", ".jpg", ".jpeg", ".webp"],
            }}
            maxFiles={1}
          >
            {({
              getRootProps,
              getInputProps,
              isDragActive,
              isDragAccept,
              isDragReject,
            }) => (
              <div
                {...getRootProps()}
                className={cn(
                  // Diubah dari aspect-square
                  "border border-dashed flex items-center justify-center aspect-video rounded-md focus:outline-none focus:border-primary",
                  {
                    "border-primary bg-secondary": isDragActive && isDragAccept,
                    "border-destructive bg-destructive/20":
                      isDragActive && isDragReject,
                  }
                )}
              >
                <input {...getInputProps()} id="profile" />
                <ImageIcon className="h-16 w-16" strokeWidth={1.25} />
              </div>
            )}
          </Dropzone>
        )}
      </div>
    </div>
  );
}
