import { DesktopNavbar } from "./desktop-navbar";

export default function UserNavbar() {
  const navData = [
    {
      title: "Blog",
      path: "/blog",
    },
    {
      title: "About",
      path: "/about",
    },
  ];

  return <DesktopNavbar items={navData} />;
}
