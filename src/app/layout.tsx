
'use client';

import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";
import BottomNav from "@/components/bottom-nav";
import ClientLayoutSetup from "@/components/client-layout-setup";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sans",
  display: 'swap',
});

// Metadata cannot be exported from a client component.
// We will manage the title dynamically if needed, or move it to a server component parent.
// export const metadata: Metadata = {
//   title: "Priyanshu's app",
//   description: "A Next.js app built in Firebase Studio.",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isAdminPage = pathname.startsWith('/admin');

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Priyanshu's app</title>
        <meta name="description" content="A Next.js app built in Firebase Studio." />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          ptSans.variable
        )}
      >
        <ClientLayoutSetup />
        {!isAdminPage && <Header />}
        <main className={cn("pb-20 pt-16 md:pb-0", isAdminPage && "p-0 m-0 h-full")}>{children}</main>
        {!isAdminPage && <BottomNav />}
        <Toaster />
      </body>
    </html>
  );
}
