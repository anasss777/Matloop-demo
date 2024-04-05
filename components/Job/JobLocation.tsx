import { useLocale, useTranslations } from "next-intl";
import React from "react";

type Props = {
  handleLocationChecked: (e: React.ChangeEvent<HTMLInputElement>) => void;
  jobLocation: string[];
};

const JobLocation = ({ handleLocationChecked, jobLocation }: Props) => {
  const t = useTranslations("jobLocation");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div>
      <form className={`flex flex-col mt-5 ${isArabic && "rtl"}`}>
        {/* on-site */}
        <div className={`flex flex-row gap-1 text-right`}>
          <input
            type="checkbox"
            id="location1"
            name="location1"
            value={isArabic ? "حضوري" : "On-site"}
            onChange={handleLocationChecked}
            checked={
              jobLocation?.includes("حضوري") || jobLocation?.includes("On-site")
            }
          />
          <label className={`text-secondary font-semibold`}>
            {t("onSite")}
          </label>
        </div>

        {/* remotley */}
        <div className={`flex flex-row gap-1 text-right`}>
          <input
            type="checkbox"
            id="location2"
            name="location2"
            value={isArabic ? "عن بعد" : "Remote"}
            onChange={handleLocationChecked}
            checked={
              jobLocation?.includes("عن بعد") || jobLocation?.includes("Remote")
            }
          />
          <label className={`text-secondary font-semibold`}>
            {t("remote")}
          </label>
        </div>

        {/* Hybrid */}
        <div className={`flex flex-row gap-1 text-right`}>
          <input
            type="checkbox"
            id="location3"
            name="location3"
            value={isArabic ? "حضوري و عن بعد" : "Hybrid"}
            onChange={handleLocationChecked}
            checked={
              jobLocation?.includes("حضوري و عن بعد") ||
              jobLocation?.includes("Hybrid")
            }
          />
          <label className={`text-secondary font-semibold`}>
            {t("hybrid")}
          </label>
        </div>
      </form>
    </div>
  );
};

export default JobLocation;
