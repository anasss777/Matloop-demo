"use client";

import { useLocale } from "next-intl";
import React from "react";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

type Props = {
  href: string;
  text: string;
};

const Menu = ({ href, text }: Props) => {
  const locale = useLocale();
  return (
    <li className={`group relative mr-3 ${locale === "en" && "ml-3"}`}>
      <Link
        locale={locale}
        href={href}
        className={`flex py-2 font-medium group-hover:text-primary lg:inline-flex lg:py-1
        lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 xl:ml-10 ${
          locale === "ar" && "rtl"
        }`}
      >
        {text}
      </Link>
    </li>
  );
};

export default Menu;
