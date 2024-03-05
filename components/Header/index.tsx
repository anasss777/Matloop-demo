"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import React from "react";
import SearchBar from "./SearchBar";
import NavbarElements from "./NavbarElements";
import LocaleSwitcher from "./LocaleSwitcher";
import Account from "./Account";

const Header = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const rtl = isArabic && "rtl";

  return (
    <div
      className={`flex flex-row justify-between items-center w-full h-fit py-3 px-2 bg-teal-500 ${rtl}`}
    >
      <Link href="/">
        <p className={`flex justify-center items-center text-3xl text-white`}>
          مطلوب
        </p>
      </Link>

      <NavbarElements />

      <div className={`flex flex-row items-center gap-5`}>
        <Account />
        <LocaleSwitcher />
      </div>
    </div>
  );
};

export default Header;
