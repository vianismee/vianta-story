import UserNavbar from "@/components/user-navbar/user-navbar";
import { Toaster } from "sonner";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <UserNavbar />
      <main>
        <div className="max-w-6xl mx-auto px-3 md:px-8 md:py-8">{children}</div>
      </main>
      <Toaster />
    </div>
  );
}
