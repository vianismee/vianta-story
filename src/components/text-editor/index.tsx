"use client";

import React from "react";
import { EditorContent, JSONContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Menubar } from "./Formatting";
import { TextAlign } from "@tiptap/extension-text-align";
import Blockquote from "@tiptap/extension-blockquote";
import { Placeholder } from "@tiptap/extensions";
import { BulletList, ListItem } from "@tiptap/extension-list";

interface TextEditorProps {
  onChangeContent: (content: JSONContent) => void;
  initialContent?: JSONContent;
}

export default function TextEditor({
  onChangeContent,
  initialContent,
}: TextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      BulletList,
      ListItem,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Blockquote,
      Placeholder.configure({
        placeholder: "Tulis blog mu disini...",
      }),
    ],
    content: initialContent,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[500px] border rounded-md px-4 py-6 text-[10pt] bg-white space-y-3",
      },
    },
    onUpdate: ({ editor }) => {
      onChangeContent(editor.getJSON());
    },
  });
  return (
    <div className="">
      <Menubar editor={editor} />
      <div className="prose-list">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
