import { useLocale, useTranslations } from "next-intl";
import React from "react";

type Props = {
  handleJobTypeChecked: (e: React.ChangeEvent<HTMLInputElement>) => void;
  jobType: string[];
};

const JobType = ({ handleJobTypeChecked, jobType }: Props) => {
  const t = useTranslations("jobType");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div>
      <form className={`flex flex-col mt-5 ${isArabic && "rtl"}`}>
        {/* Full time */}
        <div className={`flex flex-row gap-1 text-right`}>
          <input
            type="checkbox"
            id="job1"
            name="job1"
            value={isArabic ? "دوام كامل" : "FullTime"}
            onChange={handleJobTypeChecked}
            checked={
              jobType?.includes("دوام كامل") || jobType?.includes("FullTime")
            }
          />
          <label className={`text-secondary font-semibold`}>
            {t("fullTime")}
          </label>
        </div>

        {/*  Part time */}
        <div className={`flex flex-row gap-1 text-right`}>
          <input
            type="checkbox"
            id="job2"
            name="job2"
            value={isArabic ? "دوام جزئي" : "PartTime"}
            onChange={handleJobTypeChecked}
            checked={
              jobType?.includes("دوام جزئي") || jobType?.includes("PartTime")
            }
          />
          <label className={`text-secondary font-semibold`}>
            {t("partTime")}
          </label>
        </div>

        {/*  Contract */}
        <div className={`flex flex-row gap-1 text-right`}>
          <input
            type="checkbox"
            id="job3"
            name="job3"
            value={isArabic ? "عقد" : "Contract"}
            onChange={handleJobTypeChecked}
            checked={jobType?.includes("عقد") || jobType?.includes("Contract")}
          />
          <label className={`text-secondary font-semibold`}>
            {t("contract")}
          </label>
        </div>

        {/* Temporary */}
        <div className={`flex flex-row gap-1 text-right`}>
          <input
            type="checkbox"
            id="job4"
            name="job4"
            value={isArabic ? "دوام مؤقت" : "Temporary"}
            onChange={handleJobTypeChecked}
            checked={
              jobType?.includes("دوام مؤقت") || jobType?.includes("Temporary")
            }
          />
          <label className={`text-secondary font-semibold`}>
            {t("temporary")}
          </label>
        </div>

        {/* Freelance */}
        <div className={`flex flex-row gap-1 text-right`}>
          <input
            type="checkbox"
            id="job5"
            name="job5"
            value={isArabic ? "مستقل" : "Freelance"}
            onChange={handleJobTypeChecked}
            checked={
              jobType?.includes("مستقل") || jobType?.includes("Freelance")
            }
          />
          <label className={`text-secondary font-semibold`}>
            {t("freelance")}
          </label>
        </div>
      </form>
    </div>
  );
};

export default JobType;
