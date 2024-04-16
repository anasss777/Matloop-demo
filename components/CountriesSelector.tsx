import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { countries } from "./countries";

type Props = {
  handleCountrySelected: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  selectedCountry: string;
};

const CountriesSelector = (props: Props) => {
  const t = useTranslations("newPost");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div>
      {isArabic ? (
        <select
          name="categories"
          id="categories"
          onChange={props.handleCountrySelected}
          className={`bg-primary rounded-md px-2 mt-20 text-white w-full`}
        >
          <option value="" selected disabled hidden>
            {props.selectedCountry ? props.selectedCountry : t("chooseCountry")}
          </option>
          {countries.map((country, index) => (
            <option
              key={index}
              className={`bg-white text-black`}
              value={country.countryAr}
            >
              {country.countryAr}
            </option>
          ))}
        </select>
      ) : (
        <select
          name="categories"
          id="categories"
          onChange={props.handleCountrySelected}
          className={`bg-primary rounded-md px-2 mt-10 text-white w-full`}
        >
          <option value="" selected disabled hidden>
            {props.selectedCountry ? props.selectedCountry : t("chooseCountry")}
          </option>
          {countries.map((country, index) => (
            <option
              key={index}
              className={`bg-white text-black`}
              value={country.countryEn}
            >
              {country.countryEn}
            </option>
          ))}
        </select>
      )}

      <div className={`flex flex-row gap-2 items-center justify-between mt-5`}>
        <p className={`flex flex-row w-fit text-secondary font-bold`}>
          {t("chooseCity")}
        </p>
        <input
          type="text"
          value={props.city}
          onChange={(e) => props.setCity(e.target.value)}
          className={`border border-secondary/70 px-2 py-1 rounded-md ${
            isArabic && "rtl"
          }`}
        />
      </div>
    </div>
  );
};

export default CountriesSelector;
