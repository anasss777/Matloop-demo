import { useLocale, useTranslations } from "next-intl";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });
import React from "react";

const Footer = () => {
  const todayYear = new Date().getFullYear();
  const t = useTranslations("footer");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div className="flex flex-col gap-6 bg-teal-400 pt-4 px-3 mt-10 relative bottom-0">
      <Link href="/" className={`flex justify-center w-full`}>
        <p
          className={`flex justify-center items-center text-2xl text-white w-fit`}
        >
          مطلوب
        </p>
      </Link>

      <div>
        <p className="flex justify-center font-bold text-teal-700">
          {t("email")}
        </p>
        <p className="flex justify-center text-teal-100 text-sm">
          support@matloob.com
        </p>
        <p className="flex justify-center font-bold text-teal-700">
          {t("phoneNumber")}
        </p>
        <p className="flex justify-center text-teal-100 text-sm">
          +901234567890
        </p>
        <p className="flex justify-center font-bold text-teal-700">
          {t("address")}
        </p>
        <p className="flex justify-center text-teal-100 text-sm text-center">
          {t("theAddress")}
        </p>
      </div>

      <p
        className={`flex justify-center text-white mx-auto rtl bg-primary/80 pb-1 w-full text-sm font-light ${
          isArabic ? "rtl" : "ltr"
        }`}
      >
        {t("developedBy")}
        <Link
          href="https://portfolio-anasss777.vercel.app/"
          target="_blank"
          locale={locale}
          className={`text-teal-700 font-normal`}
        >
          &nbsp;Anas Chammam&nbsp;
        </Link>
        {todayYear}©
      </p>
    </div>
  );
};

export default Footer;
