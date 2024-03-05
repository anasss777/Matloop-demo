import { Cairo } from "next/font/google";
import "@/styles/globals.css";
import Head from "./Head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900", "1000"],
});

interface RootLayoutProps {
  children: ReactNode;
  params: {
    locale: string;
  };
}

export default function RootLayout({ children, params }: RootLayoutProps) {
  const locales = ["en", "ar"];
  const locale = useLocale();
  const messages = useMessages();

  if (!locales.includes(locale)) notFound();
  return (
    <html lang={locale}>
      <Head />

      <body className={cairo.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
