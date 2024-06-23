import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TODO APP",
  description: "my todo app for creating tasks",
  icons: {
    icon: "/list-todo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-screen">
          <Navbar />
          <main className="container sm:w-4/5 w-full mt-10 flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
