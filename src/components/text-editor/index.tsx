"use client";

import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import { Menubar } from "./Formatting";
import { TextAlign } from "@tiptap/extension-text-align";
import Blockquote from "@tiptap/extension-blockquote";

export default function TextEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Blockquote,
    ],
    content: "<blockquote>Hello World</blockquote>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class:
          "min-h-[500px] border rounded-md px-4 py-6 text-[10pt] bg-white space-y-3",
      },
    },
    onUpdate: ({ editor }) => {
      console.log(editor.getJSON());
    },
  });
  return (
    <div>
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
