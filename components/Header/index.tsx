"use client";

import { useLocale, useTranslations } from "next-intl";
import React from "react";
import NavbarElements from "./NavbarElements";
import LocaleSwitcher from "./LocaleSwitcher";
import Account from "./Account";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const Header = () => {
  const locale = useLocale();
  const t = useTranslations("header");
  const isArabic = locale === "ar";
  const rtl = isArabic && "rtl";

  return (
    <div
      className={`flex flex-row justify-between items-center w-full h-fit py-3 px-2 bg-teal-500 ${rtl}`}
    >
      <Link href="/" locale={locale}>
        <p className={`flex justify-center items-center text-3xl text-white`}>
          مطلوب
        </p>
      </Link>

      <NavbarElements />

      <Link
        href="/new-matloop"
        locale={locale}
        className={`btn2 bg-teal-700 rounded-xl`}
      >
        {t("addPost")}
      </Link>

      <div className={`flex flex-row items-center gap-5`}>
        <Account />
        <LocaleSwitcher />
      </div>
    </div>
  );
};

export default Header;
