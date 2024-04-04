import { useTranslations } from "next-intl";
import React, { useState } from "react";

type Props = {
  minValue: string;
  maxValue: string;
  min: string;
  max: string;
  setMinValue: React.Dispatch<React.SetStateAction<string>>;
  setMaxValue: React.Dispatch<React.SetStateAction<string>>;
  handleInputChange: (e: any) => void;
  currency?: boolean;
  year?: boolean;
};

const Ranger = (props: Props) => {
  const t = useTranslations("carType");

  return (
    <div className="flex flex-col items-center justify-start mt-5">
      {/* Min Input range */}
      <div className={`flex flex-col gap-2 justify-start w-full`}>
        <span className={`flex justify-start text-secondary font-bold`}>
          {`${props.minValue} ${props.currency ? t("currency") : ""} ${
            props.year ? t("year") : ""
          }`}
        </span>
        <input
          type="number"
          value={props.minValue}
          min={props.min}
          max={props.max}
          onChange={(e) => props.setMinValue(e.target.value)}
          onBlur={props.handleInputChange}
          className="w-full border border-secondary/70 px-2 py-1 rounded-md ltr"
        />
      </div>

      {/* Max Input range */}
      <div className={`flex flex-col gap-2 justify-start w-full`}>
        <span className={`flex justify-start text-secondary font-bold`}>
          {`${props.maxValue} ${props.currency ? t("currency") : ""} ${
            props.year ? t("year") : ""
          }`}
        </span>
        <input
          type="number"
          value={props.maxValue}
          min={props.minValue}
          max={props.max}
          onChange={(e) => props.setMaxValue(e.target.value)}
          onBlur={props.handleInputChange}
          className="w-full border border-secondary/70 px-2 py-1 rounded-md ltr"
        />
      </div>
    </div>
  );
};

export default Ranger;
