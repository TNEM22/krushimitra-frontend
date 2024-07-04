import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Krushimitra</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <meta property="og:image" content="/favicon.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1024" />
        <meta property="og:image:height" content="1024" />
        <meta property="og:image:alt" content="Krushimitra" />
        <meta property="og:title" content="Krushimitra" />
        <meta property="og:description" content="Krushimitra helping farmers" />
        <meta
          property="og:url"
          content="https://krushimitra-frontend.vercel.app/"
        />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
