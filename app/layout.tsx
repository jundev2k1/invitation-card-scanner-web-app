import { defaultLocale } from "@/i18n/request";
import { CookieStore } from "@/lib/cookies";
import { ThemeWrapper, Toast } from "./components";
import "./globals.css";
import Providers from "./providers";

// export const metadata: Metadata = {
//   title: "Admin Page",
//   description: "The page for managing by admin",
// };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = CookieStore.language ?? defaultLocale;
  return (
    <html lang={locale} suppressHydrationWarning>
      <Providers>
        <ThemeWrapper>
          {children}
          <Toast.Toaster />
        </ThemeWrapper>
      </Providers>
    </html>
  );
}
