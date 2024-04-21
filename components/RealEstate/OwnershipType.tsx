"use client";

import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  handleOwnershipType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  ownershipType: string;
};

const OwnershipType = ({ handleOwnershipType, ownershipType }: Props) => {
  const t = useTranslations("ownershipType");

  return (
    <div>
      <select
        id="embedBrand"
        onChange={handleOwnershipType}
        className={`bg-primary rounded-md px-2 text-white shadow-md w-full`}
      >
        <option
          className={`text-black bg-white`}
          value=""
          selected
          disabled
          hidden
        >
          {ownershipType?.length > 0 ? ownershipType : t("ownershipType")}
        </option>
        <option className={`text-black bg-white`} value={t("rent")}>
          {t("rent")}
        </option>
        <option className={`text-black bg-white`} value={t("buy")}>
          {t("buy")}
        </option>
      </select>
    </div>
  );
};

export default OwnershipType;
