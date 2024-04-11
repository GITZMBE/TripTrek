import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/ui/Header";
import RecoilProvider from "@/src/components/RecoilProvider";

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
        <link rel="icon" type="image/x-icon" href="favicon.png" />
        <title>Trip Trek</title>
      </head>
      <body className={inter.className}>
        <RecoilProvider>
          <Header />
          {children}
        </RecoilProvider>
      </body>
    </html>
  );
}
