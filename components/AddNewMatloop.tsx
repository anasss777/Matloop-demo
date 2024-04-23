// components/AddPostSection.tsx
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
export const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const AddNewMatloop = () => {
  const t = useTranslations("newMatloop");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <section className={`mt-16 ${!isArabic && "ltr"}`}>
      <h2 className="text-3xl font-semibold text-center mb-12 text-secondary">
        {t("newMatloop")}
      </h2>
      <div className="mx-auto px-4 flex flex-col justify-center w-full pt-20 pb-12 bg-gray-100 dark:bg-gray-800 rounded-2xl">
        <div className="flex flex-col md:flex-row md:justify-between justify-center items-center md:items-start w-full">
          {/* Step 1: Choose Category */}
          <div className="flex flex-col items-center justify-center mb-6 md:mb-0 w-1/2 md:px-10">
            <div
              className="rounded-full bg-primary/50 text-white/70 font-bold text-3xl w-20 h-20 flex items-center justify-center mb-4
            shadow-lg border border-primary"
            >
              1
            </div>
            <p className="text-xl font-bold mb-2 text-primary">{t("title1")}</p>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              {t("description1")}
            </p>
          </div>

          {/* Step 2: Fill Details */}
          <div className="flex flex-col items-center justify-center mb-6 md:mb-0 w-1/2 md:px-10">
            <div
              className="rounded-full bg-primary/50 text-white/70 font-bold text-3xl w-20 h-20 flex items-center justify-center mb-4
            shadow-lg border border-primary"
            >
              2
            </div>
            <p className="text-xl font-bold mb-2 text-primary">{t("title2")}</p>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              {t("description2")}
            </p>
          </div>

          {/* Step 3: Submit Post */}
          <div className="flex flex-col items-center justify-center w-1/2 md:px-10">
            <div
              className="rounded-full bg-primary/50 text-white/70 font-bold text-3xl w-20 h-20 flex items-center justify-center mb-4
            shadow-lg border border-primary"
            >
              3
            </div>
            <p className="text-xl font-bold mb-2 text-primary">{t("title3")}</p>
            <p className="text-gray-600 dark:text-gray-400 text-center">
              {t("description3")}
            </p>
          </div>
        </div>

        <Link
          href="/new-matloop"
          locale={locale}
          className={`btn2 bg-secondary mt-20 flex justify-center mx-auto text-xl dark:text-black dark:font-bold`}
        >
          {t("addnewMatloop")}
        </Link>
      </div>
    </section>
  );
};

export default AddNewMatloop;
