/* eslint-disable @typescript-eslint/no-explicit-any */
import Blockquote from "@tiptap/extension-blockquote";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import { useMemo } from "react";

interface TiptapRenderProps {
  content: Record<string, any>;
}

export function TiptapRender({ content }: TiptapRenderProps) {
  const generatedHtml = useMemo(() => {
    const extensions = [StarterKit, Blockquote];
    return generateHTML(content, extensions);
  }, [content]);

  return (
    <div
      className="w-full prose-xl"
      dangerouslySetInnerHTML={{ __html: generatedHtml }}
    />
  );
}
