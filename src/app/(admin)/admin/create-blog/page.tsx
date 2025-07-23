import TextEditor from "@/components/text-editor";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CreateBlogPage() {
  return (
    <div className="w-full mx-auto flex flex-col gap-3">
      <div className="flex flex-col w-full gap-2">
        <Label className="text-xl font-bold">Judul Blog</Label>
        <Input placeholder="Example..." />
      </div>
      <TextEditor />
    </div>
  );
}
