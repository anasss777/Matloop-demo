import { useLocale, useTranslations } from "next-intl";
import React from "react";

type Props = {
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  gearType: string[];
};

const GearStickType = ({ handleCheckboxChange, gearType }: Props) => {
  const t = useTranslations("gearType");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div>
      <form className={`flex flex-col mt-5 ${isArabic && "rtl"}`}>
        {/* Automatic Gear */}
        <div className={`flex flex-row gap-1 text-right`}>
          <input
            type="checkbox"
            id="gear1"
            name="gear1"
            value={isArabic ? "ألي" : "automatic"}
            onChange={handleCheckboxChange}
            checked={
              gearType?.includes("ألي") || gearType?.includes("automatic")
            }
          />
          <label className={`text-secondary font-semibold`}>
            {t("automatic")}
          </label>
        </div>

        {/*  Manual Gear */}
        <div className={`flex flex-row gap-1 text-right`}>
          <input
            type="checkbox"
            id="gear2"
            name="gear2"
            value={isArabic ? "يدوي" : "manual"}
            onChange={handleCheckboxChange}
            checked={gearType?.includes("يدوي") || gearType?.includes("manual")}
          />
          <label className={`text-secondary font-semibold`}>
            {t("manual")}
          </label>
        </div>
      </form>
    </div>
  );
};

export default GearStickType;
