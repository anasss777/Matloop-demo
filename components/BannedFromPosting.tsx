import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const BannedFromPosting = () => {
  const t = useTranslations("bannedFromPosting");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div
      className={`flex flex-col gap-10 w-full h-[70vh] justify-center items-center ${
        isArabic ? "rtl" : "ltr"
      }`}
    >
      <div>
        <Image
          src="/images/cancel.gif"
          alt="Banned GIF"
          height={600}
          width={600}
          className={`object-scale-down h-52 w-52 rounded-full border-4 border-primary`}
        />
      </div>
      <div className={`flex flex-row gap-1`}>
        <p className={`text-xl font-medium text-primary`}>
          {t("bannedMessage")}
        </p>
        <Link
          href="/contact-us"
          locale={locale}
          className={`text-xl font-bold text-secondary hover:underline transition-all duration-300 ease-linear`}
        >
          {t("whyBanned")}
        </Link>
      </div>
    </div>
  );
};

export default BannedFromPosting;
