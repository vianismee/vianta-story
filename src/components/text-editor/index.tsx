"use client";

import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import Menubar from "./Formatting";
import { TextAlign } from "@tiptap/extension-text-align";

export default function TextEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content: "<p> Hello World</p>",
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: "min-h-[156px] border rounded-md bg-slate-100 px-3 py-2",
      },
    },
  });
  return (
    <div>
      <Menubar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
