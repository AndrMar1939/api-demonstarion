import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Translator",
  description: "POC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="flex gap-5 p-3 items-center justify-center text-xl">
          <Link href='/'>Home</Link>

          <Link href='google'>Google</Link>

          <Link href='azure'>Azure</Link>
        </header>

        <main className="px-24 py-4 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
