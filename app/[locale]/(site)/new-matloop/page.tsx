"use client";

import { useLocale } from "next-intl";
import React from "react";
import CategorySelector from "@/components/CategorySelector";

const NewMatloop = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div
      className={`flex flex-col justify-center items-center h-[75vh] px-2 ${
        isArabic && "rtl"
      }`}
    >
      {isArabic ? (
        <p className={`text-secondary text-3xl font-bold text-center`}>
          إختر تصنيف مطلوبك
        </p>
      ) : (
        <p className={`text-secondary text-3xl font-bold text-center`}>
          Choose the category of your post
        </p>
      )}
      <CategorySelector />
    </div>
  );
};

export default NewMatloop;
