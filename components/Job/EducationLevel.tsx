import { useLocale, useTranslations } from "next-intl";
import React from "react";

type Props = {
  handleEducationLevelChecked: (e: React.ChangeEvent<HTMLInputElement>) => void;
  educationLevel: string[];
};

const EducationLevel = ({
  handleEducationLevelChecked,
  educationLevel,
}: Props) => {
  const t = useTranslations("educationLevel");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div>
      <form className={`flex flex-col mt-5 ${isArabic && "rtl"}`}>
        {/* None */}
        <div className={`flex flex-row gap-1 text-right`}>
          <input
            type="checkbox"
            id="educationLevel0"
            name="educationLevel0"
            value={isArabic ? "أي مستوى" : "Any Level"}
            onChange={handleEducationLevelChecked}
            checked={
              educationLevel?.includes("أي مستوى") ||
              educationLevel?.includes("Any Level")
            }
          />
          <label className={`text-secondary font-semibold`}>
            {t("anyLevel")}
          </label>
        </div>

        {/* High School */}
        <div className={`flex flex-row gap-1 text-right`}>
          <input
            type="checkbox"
            id="educationLevel1"
            name="educationLevel1"
            value={isArabic ? "ثانوي" : "High School"}
            onChange={handleEducationLevelChecked}
            checked={
              educationLevel?.includes("ثانوي") ||
              educationLevel?.includes("High School")
            }
          />
          <label className={`text-secondary font-semibold`}>
            {t("highSchool")}
          </label>
        </div>

        {/* Associate's degree */}
        <div className={`flex flex-row gap-1 text-right`}>
          <input
            type="checkbox"
            id="educationLevel2"
            name="educationLevel2"
            value={isArabic ? "دبلوم" : "Associate's degree"}
            onChange={handleEducationLevelChecked}
            checked={
              educationLevel?.includes("دبلوم") ||
              educationLevel?.includes("Associate's degree")
            }
          />
          <label className={`text-secondary font-semibold`}>
            {t("AssociateDegree")}
          </label>
        </div>

        {/* Bachelor's degree */}
        <div className={`flex flex-row gap-1 text-right`}>
          <input
            type="checkbox"
            id="educationLevel3"
            name="educationLevel3"
            value={isArabic ? "بكالريوس" : "Bachelor's degree"}
            onChange={handleEducationLevelChecked}
            checked={
              educationLevel?.includes("بكالريوس") ||
              educationLevel?.includes("Bachelor's degree")
            }
          />
          <label className={`text-secondary font-semibold`}>
            {t("BachelorDegree")}
          </label>
        </div>

        {/* Master's degree */}
        <div className={`flex flex-row gap-1 text-right`}>
          <input
            type="checkbox"
            id="educationLevel4"
            name="educationLevel4"
            value={isArabic ? "ماجيستير" : "Master's degree"}
            onChange={handleEducationLevelChecked}
            checked={
              educationLevel?.includes("ماجيستير") ||
              educationLevel?.includes("Master's degree")
            }
          />
          <label className={`text-secondary font-semibold`}>
            {t("MasterDegree")}
          </label>
        </div>

        {/* PhD */}
        <div className={`flex flex-row gap-1 text-right`}>
          <input
            type="checkbox"
            id="educationLevel5"
            name="educationLevel5"
            value={isArabic ? "دكتوراه" : "PhD"}
            onChange={handleEducationLevelChecked}
            checked={
              educationLevel?.includes("دكتوراه") ||
              educationLevel?.includes("PhD")
            }
          />
          <label className={`text-secondary font-semibold`}>{t("PhD")}</label>
        </div>
      </form>
    </div>
  );
};

export default EducationLevel;
