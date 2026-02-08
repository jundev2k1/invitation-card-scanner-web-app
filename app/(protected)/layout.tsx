'use client';
import { HeaderPage, Sidebar } from "../components";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <HeaderPage />
        <main className="flex-1 overflow-auto bg-muted/40 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
