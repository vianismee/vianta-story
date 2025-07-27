// mobile-navbar.tsx

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // Ikon dari lucide
import { InteractiveHoverButton } from "../magicui/interactive-hover-button";

interface MobileNavbarProps {
  items: { title: string; path: string }[];
}

export function MobileNavbar({ items }: MobileNavbarProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="w-full h-20 flex justify-between items-center px-4 shadow-sm relative">
      {/* Logo */}
      <Link href="/">
        <Image
          src="/asset/primary-logo.png" // Ganti dengan path logo Anda
          alt="Logo"
          width={60}
          height={32}
          className="object-contain"
        />
      </Link>

      {/* Tombol Hamburger */}
      <button onClick={() => setIsOpen(!isOpen)} className="z-20">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Menu Dropdown */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-screen bg-white z-10 flex flex-col items-center justify-center gap-8">
          <ul className="text-center space-y-6">
            {items.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  onClick={() => setIsOpen(false)} // Tutup menu setelah diklik
                  className="text-2xl font-semibold"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <InteractiveHoverButton>Contact Us!</InteractiveHoverButton>
        </div>
      )}
    </nav>
  );
}
