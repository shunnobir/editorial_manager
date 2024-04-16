import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import { Inter } from "next/font/google";
import RootLayoutBody from "@/components/layout/rootLayoutBody";

export const metadata: Metadata = {
  title: "Editorial Manager",
};

// const PublicSans = Public_Sans({
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
//   display: "swap",
//   preload: true,
//   style: ["normal", "italic"],
//   subsets: ["latin"],
// });

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: true,
  style: ["normal"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className + " w-full min-h-screen"}>
      <body className="w-full min-h-screen flex flex-col">
        <RootLayoutBody>{children}</RootLayoutBody>
      </body>
    </html>
  );
}
