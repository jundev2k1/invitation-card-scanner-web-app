'use client';
import { useThemeStore } from "@/store";
import { Toast } from "./components";
import "./globals.css";

// export const metadata: Metadata = {
//   title: "Admin Page",
//   description: "The page for managing by admin",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme, color } = useThemeStore();
  return (
    <html lang="en">
      <body className={`${theme} ${color}`}>
        {children}
        <Toast.Toaster />
      </body>
    </html>
  );
}
