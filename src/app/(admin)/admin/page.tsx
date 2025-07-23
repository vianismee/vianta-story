import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AdminPage() {
  return (
    <div>
      <Link href={"/admin/create-blog"}>
        <Button>Add Blog</Button>
      </Link>
    </div>
  );
}
