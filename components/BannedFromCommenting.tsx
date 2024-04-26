"use client";

import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { svgCancel } from "./svgsPath";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const BannedFromCommenting = () => {
  const t = useTranslations("bannedFromCommenting");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div
      className={`flex flex-row gap-1 border dark:border-gray-600 p-2 rounded-xl ${
        isArabic ? "rtl" : "ltr"
      }`}
    >
      <span className={`flex justify-center items-center`}>{svgCancel}</span>
      <p className={`text-xl font-medium text-primary`}>{t("bannedMessage")}</p>
      <Link
        href="/contact-us"
        locale={locale}
        className={`text-xl font-bold text-secondary hover:underline transition-all duration-300 ease-linear`}
      >
        {t("whyBanned")}
      </Link>
    </div>
  );
};

export default BannedFromCommenting;
