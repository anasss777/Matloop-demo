import { useLocale, useTranslations } from "next-intl";
import React from "react";

type Props = {
  handleCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  carType: string[];
};

const CarType = ({ handleCheckboxChange, carType }: Props) => {
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
            checked={carType?.includes("Sedan") || carType?.includes("سيدان")}
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
            checked={
              carType?.includes("SUV") ||
              carType?.includes("سيارة رباعية الدفع (SUV)")
            }
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
            checked={carType?.includes("شاحنة") || carType?.includes("Truck")}
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
            checked={carType?.includes("كوبيه") || carType?.includes("Coupe")}
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
            checked={
              carType?.includes("سيارة مكشوفة") ||
              carType?.includes("Convertible")
            }
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
            checked={
              carType?.includes("هاتشباك") || carType?.includes("Hatchback")
            }
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
