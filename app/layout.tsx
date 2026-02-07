'use client';
import Cookies from "js-cookie";
import { ThemeToggleButton } from "./components";
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
  const themeMode = Cookies.get("theme") || 'light';
  return (
    <html lang="en">
      <body className={themeMode}>
        {children}
        <div className="absolute right-0.5 bottom-0.5">
          <ThemeToggleButton />
        </div>
      </body>
    </html>
  );
}
