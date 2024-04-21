"use client";

import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  handleRentType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  rentType: string;
};

const RentType = ({ handleRentType, rentType }: Props) => {
  const t = useTranslations("rentType");

  return (
    <div>
      <select
        id="embedBrand"
        onChange={handleRentType}
        className={`bg-primary rounded-md px-2 text-white shadow-md mt-5`}
      >
        <option
          className={`text-black bg-white`}
          value=""
          selected
          disabled
          hidden
        >
          {rentType?.length > 0 ? rentType : t("rentType")}
        </option>
        <option className={`text-black bg-white`} value={t("yearly")}>
          {t("yearly")}
        </option>
        <option className={`text-black bg-white`} value={t("monthly")}>
          {t("monthly")}
        </option>
        <option className={`text-black bg-white`} value={t("daily")}>
          {t("daily")}
        </option>
      </select>
    </div>
  );
};

export default RentType;
