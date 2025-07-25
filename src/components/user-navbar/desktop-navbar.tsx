import Image from "next/image";
import Link from "next/link";
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";
import LetterSwapForward from "../fancy/letter-swap-forward-anim";
export function DesktopNavbar({
  items,
}: {
  items: { title: string; path: string; isActive?: boolean }[];
}) {
  return (
    <nav className="w-full h-20 flex justify-between py-11 px-[300px] items-center border-b-2 border-b-primary/50">
      <div className="relative h-10 w-40">
        {" "}
        {/* 🔧 UKURAN BISA DIOTAK-ATIK DI SINI */}
        <Link href="/">
          <Image
            src={"/asset/primary-logo.png"}
            alt="Primary Logo"
            fill // Membuat gambar mengisi div induk
            priority
            className="object-contain" // Memastikan gambar tidak penyok/terpotong
          />
        </Link>
      </div>
      <div>
        <h1>VIANTA • STORY</h1>
      </div>
      <div className="flex gap-4 items-center">
        <div className="font-serif text-primary font-bold text-[17pt] flex gap-5">
          {items.map((item) => (
            <Link key={item.title} href={item.path}>
              <LetterSwapForward label={item.title} reverse={true} />
            </Link>
          ))}
        </div>
        <InteractiveHoverButton>Contact Us!</InteractiveHoverButton>
      </div>
    </nav>
  );
}
