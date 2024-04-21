"use client";

import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  handleNumberOfRooms: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  numberOfRooms: string;
};

const NumberOfRooms = ({ handleNumberOfRooms, numberOfRooms }: Props) => {
  const t = useTranslations("numberOfRooms");

  return (
    <div>
      <select
        id="embedBrand"
        onChange={handleNumberOfRooms}
        className={`bg-primary rounded-md px-2 text-white shadow-md w-full`}
      >
        <option
          className={`text-black bg-white`}
          value=""
          selected
          disabled
          hidden
        >
          {numberOfRooms?.length > 0 ? numberOfRooms : t("numberOfRooms")}
        </option>
        <option className={`text-black bg-white`} value="1+1">
          1+1
        </option>
        <option className={`text-black bg-white`} value="1+2">
          1+2
        </option>
        <option className={`text-black bg-white`} value="1+3">
          1+3
        </option>
        <option className={`text-black bg-white`} value="1+4">
          1+4
        </option>
        <option className={`text-black bg-white`} value="2+1">
          2+1
        </option>
        <option className={`text-black bg-white`} value="2+2">
          2+2
        </option>
        <option className={`text-black bg-white`} value="2+3">
          2+3
        </option>
        <option className={`text-black bg-white`} value="2+4">
          2+4
        </option>
        <option className={`text-black bg-white`} value={t("other")}>
          {t("other")}
        </option>
      </select>
    </div>
  );
};

export default NumberOfRooms;
