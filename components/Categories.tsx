import React from "react";
import CategoryCard from "./CategoryCard";
import { useLocale, useTranslations } from "next-intl";

const Categories = () => {
  const t = useTranslations("categories");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const categoriesInfo = [
    {
      categoryName: t("jobs"),
      imgSrc: "/images/jobsImg.png",
      pageHref: "/jobs",
    },
    {
      categoryName: t("cars"),
      imgSrc: "/images/carsImg.png",
      pageHref: "/cars",
    },
    {
      categoryName: t("realEstates"),
      imgSrc: "/images/realEstateImg.png",
      pageHref: "/real-estate",
    },
    {
      categoryName: t("electronics"),
      imgSrc: "/images/electronicDevicesImg.png",
      pageHref: "/electronic-devices",
    },
  ];

  return (
    <div className="flex flex-col mt-10">
      <p className="flex justify-center mb-10 text-3xl my-5 mr-5 font-semibold text-[#4682b4]">
        {t("title")}
      </p>
      <div
        className={`grid grid-rows-2 grid-cols-2 gap-6 lg:grid-rows-1 lg:grid-cols-4 justify-center mx-2 ${
          isArabic ? "rtl" : "ltr"
        }`}
      >
        {categoriesInfo.map((category, index) => (
          <CategoryCard
            key={index}
            categoryName={category.categoryName}
            imgSrc={category.imgSrc}
            pageHref={category.pageHref}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
