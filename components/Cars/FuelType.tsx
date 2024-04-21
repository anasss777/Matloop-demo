// components/FuelType.tsx
import { useLocale } from "next-intl";
import React from "react";

interface Props {
  handlefuelTypeChecked: (e: React.ChangeEvent<HTMLInputElement>) => void;
  fuelType: string[];
}

const FuelType = ({ handlefuelTypeChecked, fuelType }: Props) => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const fuelTypes = [
    isArabic ? "بنزين" : "Gasoline",
    isArabic ? "ديزل" : "Diesel",
    isArabic ? "هجينة" : "Hybrid",
    isArabic ? "كهربائية" : "Electric",
  ];

  return (
    <div>
      <div className="flex flex-col mt-5">
        {fuelTypes.map((typeOfFuel) => (
          <div key={typeOfFuel} className="flex flex-row gap-1 items-center">
            <input
              type="checkbox"
              id={typeOfFuel}
              name="typeOfFuel"
              value={typeOfFuel}
              onChange={handlefuelTypeChecked}
              className="mr-2"
              checked={fuelType?.includes(typeOfFuel)}
            />
            <label className={`text-secondary font-bold`}>{typeOfFuel}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FuelType;
