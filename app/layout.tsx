import type { Metadata } from "next";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Lovable - Retro Portfolio",
  description: "A retro Windows 95/98 inspired portfolio website",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}