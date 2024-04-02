"use client";

import { useTranslations } from "next-intl";
import React from "react";

type Props = {
  handleDeviceBrand: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  deviceBrand: string;
};

const DeviceBrand = ({ handleDeviceBrand, deviceBrand }: Props) => {
  const t = useTranslations("deviceBrand");

  return (
    <div>
      <select
        id="embedBrand"
        onChange={handleDeviceBrand}
        className={`bg-secondary rounded-md px-2 text-white shadow-md`}
      >
        <option
          className={`text-black bg-white`}
          value=""
          selected
          disabled
          hidden
        >
          {deviceBrand?.length > 0 ? deviceBrand : t("deviceBrand")}
        </option>
        <option className={`text-black bg-white`} value={t("iphone")}>
          {t("iphone")}
        </option>
        <option className={`text-black bg-white`} value={t("samsung")}>
          {t("samsung")}
        </option>
        <option className={`text-black bg-white`} value={t("huawei")}>
          {t("huawei")}
        </option>
        <option className={`text-black bg-white`} value={t("xiaomi")}>
          {t("xiaomi")}
        </option>
        <option className={`text-black bg-white`} value={t("mac")}>
          {t("mac")}
        </option>
        <option className={`text-black bg-white`} value={t("hp")}>
          {t("hp")}
        </option>
        <option className={`text-black bg-white`} value={t("dell")}>
          {t("dell")}
        </option>
        <option className={`text-black bg-white`} value={t("lenovo")}>
          {t("lenovo")}
        </option>
        <option className={`text-black bg-white`} value={t("asus")}>
          {t("asus")}
        </option>
        <option className={`text-black bg-white`} value={t("acer")}>
          {t("acer")}
        </option>
        <option className={`text-black bg-white`} value={t("others")}>
          {t("others")}
        </option>
      </select>
    </div>
  );
};

export default DeviceBrand;
