"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

interface RangeSliderProps {
  minValue: number;
  maxValue: number;
  max: string;
  min: string;
  onChange: (minValue: number, maxValue: number) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({
  minValue,
  maxValue,
  min,
  max,
  onChange,
}) => {
  const [values, setValues] = useState({ minValue, maxValue });
  const t = useTranslations("rangeSlider");

  const handleRangeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    const newValue =
      key === "min"
        ? { minValue: +event.target.value, maxValue: values.maxValue }
        : { minValue: values.minValue, maxValue: +event.target.value };

    if (newValue.minValue <= newValue.maxValue) {
      setValues(newValue);
      onChange(newValue.minValue, newValue.maxValue);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start w-full">
      <div className={`flex flex-col justify-start w-full`}>
        <span className={`flex justify-start`}>
          {values.minValue} &nbsp; <span>{t("currency")}</span>
        </span>
        <input
          type="range"
          min={min}
          max={max}
          value={values.minValue}
          onChange={(e) => handleRangeChange(e, "min")}
          className="w-full"
        />
      </div>

      <div className={`flex flex-col justify-start w-full`}>
        <span className={`flex justify-start`}>
          {values.maxValue} &nbsp; <span>{t("currency")}</span>
        </span>
        <input
          type="range"
          min={min}
          max={max}
          value={values.maxValue}
          onChange={(e) => handleRangeChange(e, "max")}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default RangeSlider;
