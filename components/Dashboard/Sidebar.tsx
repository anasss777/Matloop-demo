"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import React from "react";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const Sidebar = () => {
  const t = useTranslations("adminPanel");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const currentPage = usePathname();

  return (
    <div
      className={`flex flex-col items-center w-1/5 h-screen sticky shadow-Card2 py-5 px-2 border-r dark:border-r-gray-600 ${
        isArabic && "border-l dark:border-l-gray-600"
      }`}
    >
      <div className={`flex flex-col gap-1 items-center w-full`}>
        {/* Dashboard button */}
        <Link
          href="/dashboard"
          locale={locale}
          className={`w-full py-2 text-gray-400 hover:bg-gray-700 transition-all duration-300 ease-linear px-2 rounded-xl
          ${
            currentPage === `/${locale}/dashboard` &&
            "bg-secondary hover:bg-secondary text-white font-semibold transition-all ease-linear"
          }`}
        >
          {t("dashboard")}
        </Link>

        {/* Posts button */}
        <Link
          href="/dashboard/posts"
          locale={locale}
          className={`w-full py-2 text-gray-400 hover:bg-gray-700 transition-all duration-300 ease-linear px-2 rounded-xl
          ${
            currentPage === `/${locale}/posts` &&
            "bg-secondary hover:bg-secondary text-white font-semibold transition-all ease-linear"
          }`}
        >
          {t("posts")}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
