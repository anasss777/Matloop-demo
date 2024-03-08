import { useLocale, useTranslations } from "next-intl";
import React from "react";

type Props = {
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const CarType = ({ handleCheckboxChange }: Props) => {
  const t = useTranslations("carType");
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
            value={!isArabic ? "Sedan" : "سيدان"}
            onChange={handleCheckboxChange}
          />
          <label className={`text-secondary font-semibold`}>{t("Sedan")}</label>
        </div>
        <div className={`flex flex-row gap-1 text-right`}>
          <input
            type="checkbox"
            id="vehicle2"
            name="vehicle2"
            value={!isArabic ? "SUV" : "سيارة رباعية الدفع (SUV)"}
            onChange={handleCheckboxChange}
          />
          <label className={`text-secondary font-semibold`}>{t("SUV")}</label>
        </div>
        <div className={`flex flex-row gap-1 text-right`}>
          <input
            type="checkbox"
            id="vehicle3"
            name="vehicle3"
            value={!isArabic ? "Truck" : "شاحنة"}
            onChange={handleCheckboxChange}
          />
          <label className={`text-secondary font-semibold`}>{t("Truck")}</label>
        </div>
        <div className={`flex flex-row gap-1 text-right`}>
          <input
            type="checkbox"
            id="vehicle1"
            name="vehicle1"
            value={!isArabic ? "Coupe" : "كوبيه"}
            onChange={handleCheckboxChange}
          />
          <label className={`text-secondary font-semibold`}>{t("Coupe")}</label>
        </div>
        <div className={`flex flex-row gap-1 text-right`}>
          <input
            type="checkbox"
            id="vehicle2"
            name="vehicle2"
            value={!isArabic ? "Convertible" : "سيارة مكشوفة"}
            onChange={handleCheckboxChange}
          />
          <label className={`text-secondary font-semibold`}>
            {t("Convertible")}
          </label>
        </div>
        <div className={`flex flex-row gap-1 text-right`}>
          <input
            type="checkbox"
            id="vehicle3"
            name="vehicle3"
            value={!isArabic ? "Hatchback" : "هاتشباك"}
            onChange={handleCheckboxChange}
          />
          <label className={`text-secondary font-semibold`}>
            {t("Hatchback")}
          </label>
        </div>
      </form>
    </div>
  );
};

export default CarType;
