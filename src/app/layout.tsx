import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/layout/sidebar";
import { EdgeStoreProvider } from "@/context/edgestore.provider";
import Header from "@/components/ui/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Correct Mate Dashboard",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <EdgeStoreProvider>
          <Header/>
          <SideBar>{children}</SideBar>
        </EdgeStoreProvider>
      </body>
    </html>
  );
}
