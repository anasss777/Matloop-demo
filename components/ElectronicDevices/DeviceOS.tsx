"use client";

import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  handleDeviceOS: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  deviceOS: string;
};

const DeviceOS = ({ handleDeviceOS, deviceOS }: Props) => {
  const t = useTranslations("deviceOS");

  return (
    <div>
      <select
        id="embedBrand"
        onChange={handleDeviceOS}
        className={`bg-secondary rounded-md px-2 text-white shadow-md`}
      >
        <option
          className={`text-black bg-white`}
          value=""
          selected
          disabled
          hidden
        >
          {deviceOS?.length > 0 ? deviceOS : t("deviceOS")}
        </option>
        <option className={`text-black bg-white`} value={t("iOS")}>
          {t("iOS")}
        </option>
        <option className={`text-black bg-white`} value={t("android")}>
          {t("android")}
        </option>
        <option className={`text-black bg-white`} value={t("macOS")}>
          {t("macOS")}
        </option>
        <option className={`text-black bg-white`} value={t("windows")}>
          {t("windows")}
        </option>
        <option className={`text-black bg-white`} value={t("others")}>
          {t("others")}
        </option>
      </select>
    </div>
  );
};

export default DeviceOS;
