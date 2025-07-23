import React from "react";

import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Italic,
  Quote,
  Strikethrough,
} from "lucide-react";
import { Button } from "../ui/button"; // Ganti import dari Toggle ke Button

import { Editor } from "@tiptap/react";

export function Menubar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  const Options = [
    {
      icon: <Heading1 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
      isActive: editor.isActive("heading", { level: 1 }),
    },
    {
      icon: <Heading2 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
      isActive: editor.isActive("heading", { level: 2 }),
    },
    {
      icon: <Heading3 className="size-4" />,
      onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
      isActive: editor.isActive("heading", { level: 3 }),
    },
    {
      icon: <Bold className="size-4" />,
      onClick: () => editor.chain().focus().toggleBold().run(),
      isActive: editor.isActive("bold"),
    },
    {
      icon: <Italic className="size-4" />,
      onClick: () => editor.chain().focus().toggleItalic().run(),
      isActive: editor.isActive("italic"),
    },
    {
      icon: <Strikethrough className="size-4" />,
      onClick: () => editor.chain().focus().toggleStrike().run(),
      isActive: editor.isActive("strike"),
    },
    {
      icon: <Quote className="size-4" />,
      onClick: () => editor.chain().focus().toggleBlockquote().run(),
      isActive: editor.isActive("blockquote"),
    },
  ];

  return (
    <div className="border rounded-md p-1 mb-1 space-x-2 z-50 ">
      {Options.map((option, index) => (
        <Button
          variant="ghost" // Opsional: untuk tampilan seperti toggle
          size="icon" // Opsional: untuk membuat tombol menjadi kotak
          key={index}
          onClick={option.onClick}
          className={option.isActive ? "bg-muted text-foreground" : ""} // Kelas untuk style aktif
        >
          {option.icon}
        </Button>
      ))}
    </div>
  );
}
