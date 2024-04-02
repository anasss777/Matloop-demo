"use client";

import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  handleDeviceType: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  deviceType: string;
};

const DeviceType = ({ handleDeviceType, deviceType }: Props) => {
  const t = useTranslations("deviceType");

  return (
    <div>
      <select
        id="embedBrand"
        onChange={handleDeviceType}
        className={`bg-secondary rounded-md px-2 text-white shadow-md`}
      >
        <option
          className={`text-black bg-white`}
          value=""
          selected
          disabled
          hidden
        >
          {deviceType?.length > 0 ? deviceType : t("deviceType")}
        </option>
        <option className={`text-black bg-white`} value={t("smartphone")}>
          {t("smartphone")}
        </option>
        <option className={`text-black bg-white`} value={t("tablet")}>
          {t("tablet")}
        </option>
        <option className={`text-black bg-white`} value={t("laptop")}>
          {t("laptop")}
        </option>
        <option className={`text-black bg-white`} value={t("desktop")}>
          {t("desktop")}
        </option>
        <option className={`text-black bg-white`} value={t("smartwatch")}>
          {t("smartwatch")}
        </option>
        <option className={`text-black bg-white`} value={t("earphone")}>
          {t("earphone")}
        </option>
        <option className={`text-black bg-white`} value={t("others")}>
          {t("others")}
        </option>
      </select>
    </div>
  );
};

export default DeviceType;
