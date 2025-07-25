import UserNavbar from "@/components/user-navbar/user-navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Menggunakan flex-col dan min-h-screen untuk memastikan footer menempel di bawah
    // bahkan jika konten halaman pendek.
    <div className="flex min-h-screen flex-col">
      <UserNavbar />

      {/* 'main' adalah tempat konten utama dari setiap halaman akan dirender */}
      {/* 'flex-grow' memastikan area ini mengisi ruang yang tersedia, mendorong footer ke bawah */}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">{children}</div>
      </main>
    </div>
  );
}
