"use client";

import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { svgDown, svgFilter, svgTop } from "../svgsPath";
import BrandSelector from "./BrandSelector";
import CarType from "./CarType";
import Ranger from "./Ranger";
import GearStickType from "./GearStickType";
import FuelType from "./FuelType";
import CountriesSelector from "../CountriesSelector";
import Accordion from "../Accordion";

type Props = {
  onCarBrandChange: (brand: string) => void;
  onCarTypeChange: (type: string[]) => void;
  onMinPriceChange: (min: string) => void;
  onMaxPriceChange: (max: string) => void;
  onMinYearChange: (min: string) => void;
  onMaxYearChange: (max: string) => void;
  onMinDistanceChange: (min: string) => void;
  onMaxDistanceChange: (max: string) => void;
  onCarGearChange: (type: string[]) => void;
  onCarFuelChange: (type: string[]) => void;
  onCountryChange: (country: string) => void;
  onCityChange: (city: string) => void;
};

const FilterCars = ({
  onCarBrandChange,
  onCarTypeChange,
  onMinPriceChange,
  onMaxPriceChange,
  onMinYearChange,
  onMaxYearChange,
  onMinDistanceChange,
  onMaxDistanceChange,
  onCarGearChange,
  onCarFuelChange,
  onCountryChange,
  onCityChange,
}: Props) => {
  const t = useTranslations("filters");
  const c = useTranslations("newPost");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [carBrand, setCarBrand] = useState("");

  const [carType, setCarType] = useState<string[]>([]);

  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("5000000");

  const currentYear = new Date().getFullYear();
  const [minYear, setMinYear] = useState("1886");
  const [maxYear, setMaxYear] = useState(String(currentYear));

  const [minDistance, setMinDistance] = useState("0");
  const [maxDistance, setMaxDistance] = useState("100000");

  const [gearType, setGearType] = useState<string[]>([]);

  const [fuelType, setFuelType] = useState<string[]>([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [city, setCity] = useState("");

  const handleCarBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedBrand = e.target.options[e.target.selectedIndex].text;
    setCarBrand(selectedBrand);
    onCarBrandChange(selectedBrand); // Pass the selected brand to the parent component
  };

  const handleCarTypeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setCarType((prevCarType) => [...prevCarType, value]);
      onCarTypeChange([...carType, value]);
    } else {
      setCarType((prevCarType) => prevCarType.filter((type) => type !== value));
      onCarTypeChange(carType.filter((type) => type !== value));
    }
  };

  const handlePriceChange = () => {
    let minp = parseInt(minPrice);
    let maxp = parseInt(maxPrice);

    if (minp < 0) {
      alert("Minimum price cannot be less than 0");
      setMinPrice("0");
      onMinPriceChange("0");
      minp = 0;
    }

    if (maxp > 5000000) {
      alert("Maximum price cannot be greater than 5000000");
      setMaxPrice("5000000");
      onMaxPriceChange("5000000");
      maxp = 5000000;
    }

    if (minp > maxp) {
      setMinPrice(maxp.toString());
      onMinPriceChange(maxp.toString());
      minp = maxp;

      if (minp < 0) {
        setMinPrice("0");
        onMinPriceChange("0");
        minp = 0;
      }
    }

    onMinPriceChange(minp.toString());
    onMaxPriceChange(maxp.toString());
  };

  const handleYearChange = () => {
    let miny = parseInt(minYear);
    let maxy = parseInt(maxYear);

    if (miny < 1886) {
      alert("Minimum year cannot be less than 1886");
      onMinYearChange("1886");
      miny = 1886;
    }

    if (maxy > currentYear) {
      alert("Maximum year cannot be greater than currentYear");
      onMaxYearChange(String(currentYear));
      maxy = currentYear;
    }

    if (miny > maxy) {
      onMinYearChange(maxy.toString());
      miny = maxy;

      if (miny < 1886) {
        onMinYearChange("1886");
        miny = 1886;
      }
    }

    onMinYearChange(miny.toString());
    onMaxYearChange(maxy.toString());
  };

  const handleDistanceChange = () => {
    let mind = parseInt(minDistance);
    let maxd = parseInt(maxDistance);

    if (mind < 0) {
      alert("Minimum distance cannot be less than 0");
      setMinDistance("0");
      mind = 0;
    }

    if (maxd > 1000000000) {
      alert("Maximum distance cannot be greater than 1000000000");
      setMaxDistance("1000000000");
      maxd = 1000000000;
    }

    if (mind > maxd) {
      setMinDistance(maxd.toString());
      mind = maxd;

      if (mind < 0) {
        setMinDistance("0");
        mind = 0;
      }
    }

    onMinDistanceChange(mind.toString());
    onMaxDistanceChange(maxd.toString());
  };

  const handleGearTypeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setGearType((prevGearType) => [...prevGearType, value]);
      onCarGearChange([...gearType, value]);
    } else {
      setGearType((prevGearType) =>
        prevGearType.filter((type) => type !== value)
      );
      onCarGearChange(gearType.filter((type) => type !== value));
    }
  };

  const handlefuelTypeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setFuelType((prevFuelType) => [...prevFuelType, value]);
      onCarFuelChange([...fuelType, value]);
    } else {
      setFuelType((prevFuelType) =>
        prevFuelType.filter((type) => type !== value)
      );
      onCarFuelChange(fuelType.filter((type) => type !== value));
    }
  };

  const handleCountrySelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
    onCountryChange(e.target.value);
  };

  useEffect(() => {
    onCityChange(city);
  }, [city]);

  return (
    <div
      className={`bg-white dark:bg-gray-800 h-fit w-full py-5 lg:rounded-xl lg:shadow-Card sticky top-14 mt-5 lg:border ${
        isArabic && "rtl text-right"
      }`}
    >
      <h1
        className={`flex flex-row items-center text-primary text-lg md:text-xl lg:text-xl font-bold px-5`}
      >
        {svgFilter}
        {t("filter")}
      </h1>

      <div className={`px-10 -mt-14`}>
        {/* Brand filter */}
        <div className={`flex flex-row justify-between items-center`}>
          <BrandSelector
            handleBrandSelected={handleCarBrand}
            carBrand={carBrand}
          />
        </div>
        {/* Car type filter */}
        <Accordion
          title={c("carType")}
          content={
            <CarType
              handleCheckboxChange={handleCarTypeChecked}
              carType={carType}
            />
          }
        />

        {/* Price Range */}
        <Accordion
          title={c("carPriceRange")}
          content={
            <Ranger
              minValue={minPrice}
              maxValue={maxPrice}
              setMinValue={setMinPrice}
              setMaxValue={setMaxPrice}
              min="0"
              max="5000000"
              handleInputChange={handlePriceChange}
              currency
            />
          }
        />

        {/* Year range */}
        <Accordion
          title={c("carYearRange")}
          content={
            <Ranger
              minValue={minYear}
              maxValue={maxYear}
              setMinValue={setMinYear}
              setMaxValue={setMaxYear}
              min="1886"
              max={String(currentYear)}
              handleInputChange={handleYearChange}
              year
            />
          }
        />

        {/* Distance */}
        <Accordion
          title={c("maxDistance")}
          content={
            <Ranger
              minValue={minDistance}
              maxValue={maxDistance}
              setMinValue={setMinDistance}
              setMaxValue={setMaxDistance}
              min="0"
              max="1000000000"
              handleInputChange={handleDistanceChange}
            />
          }
        />

        {/* Gear stick */}
        <Accordion
          title={c("gearType")}
          content={
            <GearStickType
              handleCheckboxChange={handleGearTypeChecked}
              gearType={gearType}
            />
          }
        />

        {/* Fuel type */}
        <Accordion
          title={c("fuelType")}
          content={
            <FuelType
              handlefuelTypeChecked={handlefuelTypeChecked}
              fuelType={fuelType}
            />
          }
        />

        {/* Counrty and city */}
        <CountriesSelector
          handleCountrySelected={handleCountrySelected}
          city={city}
          setCity={setCity}
          selectedCountry={selectedCountry}
        />
      </div>
    </div>
  );
};

export default FilterCars;
