"use client";

import { useLocale } from "next-intl";
import React from "react";
import CategorySelector from "@/components/CategorySelector";

const NewMatloop = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div
      className={`flex flex-col justify-center items-center ${
        isArabic && "rtl"
      }`}
    >
      <CategorySelector />
    </div>
  );
};

export default NewMatloop;
