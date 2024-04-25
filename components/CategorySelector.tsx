import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { usePathname } from "next/navigation";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const CategorySelector = () => {
  const t = useTranslations("newPost");
  const locale = useLocale();
  const currentPage = usePathname();

  return (
    <div className={`flex flex-wrap justify-center gap-3 my-5`}>
      <Link
        locale={locale}
        href="/new-matloop/job"
        className={`btn2 shadow-sm text-primary sm:text-xl text-lg font-bold bg-primary/30 ${
          currentPage.includes(`/${locale}/new-matloop/job`) &&
          `chosen-btn text-white`
        }`}
      >
        {t("jobs")}
      </Link>
      <Link
        locale={locale}
        href="/new-matloop/car"
        className={`btn2 shadow-sm text-primary sm:text-xl text-lg font-bold bg-primary/30 ${
          currentPage.includes(`/${locale}/new-matloop/car`) &&
          `chosen-btn text-white`
        }`}
      >
        {t("cars")}
      </Link>
      <Link
        locale={locale}
        href="/new-matloop/real-estate"
        className={`btn2 shadow-sm text-primary sm:text-xl text-lg font-bold bg-primary/30 ${
          currentPage.includes(`/${locale}/new-matloop/real-estate`) &&
          `chosen-btn text-white`
        }`}
      >
        {t("realEstates")}
      </Link>
      <Link
        locale={locale}
        href="/new-matloop/electronic-device"
        className={`btn2 shadow-sm text-primary sm:text-xl text-lg font-bold bg-primary/30 ${
          currentPage.includes(`/${locale}/new-matloop/electronic-device`) &&
          `chosen-btn text-white`
        }`}
      >
        {t("electronics")}
      </Link>
    </div>
  );
};

export default CategorySelector;
