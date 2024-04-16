"use client";

import React from "react";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useLocale } from "next-intl";
import { svgDot, svgHome } from "./svgsPath";

export const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

type Props = {
  categorySvg: JSX.Element;
  categoryName: string;
  categoryLink: string;
  postTitle: string;
};

const Breadcrumbs = ({
  categorySvg,
  categoryName,
  categoryLink,
  postTitle,
}: Props) => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div className={`flex flex-row gap-1 justify-center items-center`}>
      <Link
        href="/"
        locale={locale}
        className={`flex flex-row gap-1 items-center justify-center hover:text-primary transition-colors duration-300 ease-linear`}
      >
        <span
          className={`bg-primary/20 h-fit w-fit p-1 rounded-lg border border-primary shadow-Card2`}
        >
          {svgHome}
        </span>
        {isArabic ? "الصفحة الرئيسية" : "Home"}
      </Link>
      <span>{svgDot}</span>

      <Link
        href={categoryLink}
        locale={locale}
        className={`flex flex-row gap-1 items-center justify-center hover:text-primary transition-colors duration-300 ease-linear`}
      >
        <span
          className={`bg-primary/20 h-fit w-fit p-1 rounded-lg border border-primary shadow-Card2`}
        >
          {categorySvg}
        </span>
        {categoryName}
      </Link>
      <span>{svgDot}</span>
      <p>{postTitle}</p>
    </div>
  );
};

export default Breadcrumbs;
