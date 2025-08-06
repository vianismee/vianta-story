import { useBlogMatrix } from "@/hooks/use-blog-matrix";
import { useFormattedDate } from "@/hooks/use-formated-date";
import { Eye } from "lucide-react";

interface BlogMatrixProps {
  postId: number;
  createdAt: string;
}

export function BlogMatrix({ postId, createdAt }: BlogMatrixProps) {
  const { viewCount } = useBlogMatrix(postId);
  return (
    <div className=" flex md:flex-col gap-5 md:gap-1 px-3 md:border-l-2 border-primary md:w-[30%]">
      <p>{useFormattedDate(createdAt)}</p>
      <div className="inline-flex items-center gap-2">
        <Eye className="text-primary/50" />
        <p>{viewCount?.view_count} views</p>
      </div>
    </div>
  );
}
