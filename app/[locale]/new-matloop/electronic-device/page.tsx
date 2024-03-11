"use client";

import CategorySelector from "@/components/CategorySelector";
import { useLocale } from "next-intl";
import React from "react";

const ElectronicDevice = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div
      className={`flex flex-col justify-center items-center px-8 ${
        isArabic && "rtl"
      }`}
    >
      <CategorySelector />
    </div>
  );
};

export default ElectronicDevice;
