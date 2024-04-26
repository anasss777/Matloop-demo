"use client";

import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import NavbarElements from "./NavbarElements";
import LocaleSwitcher from "./LocaleSwitcher";
import Account from "./Account";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import ThemeSwitcher from "../ThemeSwitcher";
import { svgLogo } from "../svgsPath";

export const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const Header = () => {
  const locale = useLocale();
  const t = useTranslations("header");
  const isArabic = locale === "ar";
  const rtl = isArabic && "rtl";
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className={`sticky top-0 transition-all z-40 flex flex-row justify-between items-center w-full h-fit py-3 lg:py-0 px-2 md:px-10 lg:px-20
      bg-teal-500 dark:bg-teal-700 border-b border-b-teal-200 dark:border-b dark:border-b-teal-500 ${rtl} ${
        scrolling ? "bg-primary/90" : "bg-primary"
      }`}
    >
      <div className={`flex flex-row gap-5 justify-center items-center`}>
        <Link
          href="/"
          locale={locale}
          className={`flex flex-row justify-center items-center gap-1`}
        >
          <span>{svgLogo}</span>
          <p>مطلوب</p>
        </Link>

        <Link
          href="/new-matloop"
          locale={locale}
          className={`btn2 bg-teal-700 dark:bg-teal-600 rounded-xl`}
        >
          {t("addPost")}
        </Link>
      </div>

      <NavbarElements />

      <div className={`flex flex-row items-center gap-5`}>
        <div className={`hidden lg:block`}>
          <ThemeSwitcher />
        </div>
        <Account />
        <LocaleSwitcher />
      </div>
    </div>
  );
};

export default Header;
