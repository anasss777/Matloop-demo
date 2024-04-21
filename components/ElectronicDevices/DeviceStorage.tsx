"use client";

import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  handleDeviceStorage: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  deviceStorage: string;
};

const DeviceStorage = ({ handleDeviceStorage, deviceStorage }: Props) => {
  const t = useTranslations("deviceStorage");

  return (
    <div>
      <select
        id="embedBrand"
        onChange={handleDeviceStorage}
        className={`bg-primary rounded-md px-2 text-white shadow-md w-full`}
      >
        <option
          className={`text-black bg-white`}
          value=""
          selected
          disabled
          hidden
        >
          {deviceStorage?.length > 0 ? deviceStorage : t("deviceStorage")}
        </option>
        <option className={`text-black bg-white`} value={`32 ${t("GB")}`}>
          32 {t("GB")}
        </option>
        <option className={`text-black bg-white`} value={`64 ${t("GB")}`}>
          64 {t("GB")}
        </option>
        <option className={`text-black bg-white`} value={`128 ${t("GB")}`}>
          128 {t("GB")}
        </option>
        <option className={`text-black bg-white`} value={`256 ${t("GB")}`}>
          256 {t("GB")}
        </option>
        <option className={`text-black bg-white`} value={`512 ${t("GB")}`}>
          512 {t("GB")}
        </option>
        <option className={`text-black bg-white`} value={`1 ${t("TB")}`}>
          1 {t("TB")}
        </option>
        <option className={`text-black bg-white`} value={`2 ${t("TB")}`}>
          2 {t("TB")}
        </option>
        <option className={`text-black bg-white`} value={`3 ${t("TB")}`}>
          3 {t("TB")}
        </option>
        <option className={`text-black bg-white`} value={`4 ${t("TB")}`}>
          4 {t("TB")}
        </option>
        <option className={`text-black bg-white`} value={t("others")}>
          {t("others")}
        </option>
      </select>
    </div>
  );
};

export default DeviceStorage;
