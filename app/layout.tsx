import { headers } from "next/headers";
import { ThemeWrapper, Toast } from "./components";
import "./globals.css";

// export const metadata: Metadata = {
//   title: "Admin Page",
//   description: "The page for managing by admin",
// };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const locale = headerList.get('x-next-intl-locale') ?? 'en';
    
  return (
    <html lang={locale} suppressHydrationWarning>
      <ThemeWrapper>
        {children}
        <Toast.Toaster />
      </ThemeWrapper>
    </html>
  );
}
