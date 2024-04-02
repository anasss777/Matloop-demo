import { useLocale, useTranslations } from "next-intl";
import React from "react";

type Props = {
  handleDeviceCondition: (e: React.ChangeEvent<HTMLInputElement>) => void;
  deviceCondition: string[];
};

const DeviceCondition = ({ handleDeviceCondition, deviceCondition }: Props) => {
  const t = useTranslations("deviceCondition");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div>
      <form className={`flex flex-col mt-5 ${isArabic && "rtl"}`}>
        <div className={`flex flex-row gap-1 text-right`}>
          <input
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
            value={!isArabic ? "new" : "جديد"}
            onChange={handleDeviceCondition}
            checked={
              deviceCondition?.includes("new") ||
              deviceCondition?.includes("جديد")
            }
          />
          <label className={`text-secondary font-semibold`}>{t("new")}</label>
        </div>
        <div className={`flex flex-row gap-1 text-right`}>
          <input
            type="checkbox"
            id="vehicle2"
            name="vehicle2"
            value={!isArabic ? "Refurbished" : "مجدد"}
            onChange={handleDeviceCondition}
            checked={
              deviceCondition?.includes("Refurbished") ||
              deviceCondition?.includes("مجدد")
            }
          />
          <label className={`text-secondary font-semibold`}>
            {t("refurbished")}
          </label>
        </div>
        <div className={`flex flex-row gap-1 text-right`}>
          <input
            type="checkbox"
            id="vehicle3"
            name="vehicle3"
            value={!isArabic ? "Used" : "مستعمل"}
            onChange={handleDeviceCondition}
            checked={
              deviceCondition?.includes("مستعمل") ||
              deviceCondition?.includes("Used")
            }
          />
          <label className={`text-secondary font-semibold`}>{t("used")}</label>
        </div>
      </form>
    </div>
  );
};

export default DeviceCondition;
