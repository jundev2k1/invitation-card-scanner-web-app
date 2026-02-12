'use client';
import { ThemeWrapper, Toast } from "./components";
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
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeWrapper>
        {children}
        <Toast.Toaster />
      </ThemeWrapper>
    </html>
  );
}
