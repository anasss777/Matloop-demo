"use client";

import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  handlePropertyType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  propertyType: string;
};

const PropertyType = ({ handlePropertyType, propertyType }: Props) => {
  const t = useTranslations("propertyType");

  return (
    <div>
      <select
        id="embedBrand"
        onChange={handlePropertyType}
        className={`bg-secondary rounded-md px-2 text-white shadow-md`}
      >
        <option
          className={`text-black bg-white`}
          value=""
          selected
          disabled
          hidden
        >
          {propertyType?.length > 0 ? propertyType : t("propertyType")}
        </option>
        <option className={`text-black bg-white`} value={t("apartment")}>
          {t("apartment")}
        </option>
        <option className={`text-black bg-white`} value={t("villa")}>
          {t("villa")}
        </option>
        <option className={`text-black bg-white`} value={t("Chalet")}>
          {t("Chalet")}
        </option>
        <option
          className={`text-black bg-white`}
          value={t("commercialProperty")}
        >
          {t("commercialProperty")}
        </option>
        <option className={`text-black bg-white`} value={t("office")}>
          {t("office")}
        </option>
        <option className={`text-black bg-white`} value={t("farm")}>
          {t("farm")}
        </option>
        <option className={`text-black bg-white`} value={t("other")}>
          {t("other")}
        </option>
      </select>
    </div>
  );
};

export default PropertyType;
