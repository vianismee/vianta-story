// user-navbar.tsx

"use client"; // Diperlukan karena menggunakan hook dan state

import { useIsMobile } from "@/hooks/use-mobile";
import { DesktopNavbar } from "./desktop-navbar";
import { MobileNavbar } from "./mobile-navbar";
// Pastikan path benar

export default function UserNavbar() {
  const navData = [
    {
      title: "Blog",
      path: "/blog",
    },
  ];

  const isMobile = useIsMobile();

  // Mencegah hydration error, jangan render apapun sampai 'isMobile' memiliki nilai
  if (isMobile === undefined) {
    return null; // atau tampilkan loading skeleton
  }

  // Lakukan conditional rendering
  return isMobile ? (
    <MobileNavbar items={navData} />
  ) : (
    <DesktopNavbar items={navData} />
  );
}
