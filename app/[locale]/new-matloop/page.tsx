"use client";

import Cars from "@/components/Cars";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const NewMatloop = () => {
  const t = useTranslations("newPost");
  const [selectedCategory, setSelectedCategory] = useState("");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const router = useRouter();

  if (selectedCategory === "cars") {
    router.push("/new-matloop/car");
  } else if (selectedCategory === "jobs") {
    return <div>{selectedCategory}</div>;
  } else if (selectedCategory === "realEstates") {
    return <div>{selectedCategory}</div>;
  } else if (selectedCategory === "electronics") {
    return <div>{selectedCategory}</div>;
  }

  return (
    <div
      className={`flex flex-col justify-center items-center ${
        isArabic && "rtl"
      }`}
    >
      <select
        onChange={(e) => setSelectedCategory(e.target.value)}
        name="categories"
        id="categories"
        className={`bg-primary rounded-md px-2 mt-10 text-white`}
      >
        <option value="" selected disabled hidden>
          {t("chooseCategory")}
        </option>
        <option className={`bg-white text-black`} value="cars">
          {t("cars")}
        </option>
        <option className={`bg-white text-black`} value="jobs">
          {t("jobs")}
        </option>
        <option className={`bg-white text-black`} value="realEstates">
          {t("realEstates")}
        </option>
        <option className={`bg-white text-black`} value="electronics">
          {t("electronics")}
        </option>
      </select>
    </div>
  );
};

export default NewMatloop;
