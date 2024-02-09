import { Cairo, Inter } from "next/font/google";
import "./globals.css";
import Head from "./Head";
import Header from "@/components/Header";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900", "1000"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head />

      <body className={cairo.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
