"use client";

import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { svgDown, svgFilter, svgTop } from "../svgsPath";
import CountriesSelector from "../CountriesSelector";
import Accordion from "../Accordion";
import DeviceType from "./DeviceType";
import DeviceBrand from "./DeviceBrand";
import Ranger from "../Cars/Ranger";
import DeviceCondition from "./DeviceCondition";
import DeviceOS from "./DeviceOS";
import DeviceStorage from "./DeviceStorage";

type Props = {
  onDeviceTypeChange: (type: string) => void;
  onDeviceBrandChange: (brand: string) => void;
  onDeviceConditionChange: (condition: string[]) => void;
  onMinPriceChange: (minPrice: string) => void;
  onMaxPriceChange: (maxPrice: string) => void;
  onDeviceOSChange: (deviceOS: string) => void;
  onDeviceStorageChange: (storage: string) => void;
  onSelectedCountryChange: (country: string) => void;
  onCityChange: (city: string) => void;
};

const FilterDevices = ({
  onDeviceTypeChange,
  onDeviceBrandChange,
  onDeviceConditionChange,
  onMinPriceChange,
  onMaxPriceChange,
  onDeviceOSChange,
  onDeviceStorageChange,
  onSelectedCountryChange,
  onCityChange,
}: Props) => {
  const t = useTranslations("filters");
  const d = useTranslations("newElectonicDevicePost");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [deviceType, setDeviceType] = useState("");

  const [deviceBrand, setDeviceBrand] = useState("");

  const [deviceCondition, setDeviceCondition] = useState<string[]>([]);

  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("50000");

  const [deviceOS, setDeviceOS] = useState("");

  const [deviceStorage, setDeviceStorage] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [city, setCity] = useState("");

  const handleDeviceType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDeviceType(e.target.value);
    onDeviceTypeChange(e.target.value);
  };

  const handleDeviceBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDeviceBrand(e.target.value);
    onDeviceBrandChange(e.target.value);
  };

  const handleDeviceCondition = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setDeviceCondition((prevDeviceCondition) => [
        ...prevDeviceCondition,
        value,
      ]);
      onDeviceConditionChange([...deviceCondition, value]);
    } else {
      setDeviceCondition((prevDeviceCondition) =>
        prevDeviceCondition.filter((condition) => condition !== value)
      );
      onDeviceConditionChange(
        deviceCondition.filter((condition) => condition !== value)
      );
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

    if (maxp > 500000) {
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

    onMinPriceChange(minPrice.toString());
    onMaxPriceChange(maxPrice.toString());
  };

  const handleDeviceOS = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDeviceOS(e.target.value);
    onDeviceOSChange(e.target.value);
  };

  const handleDeviceStorage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDeviceStorage(e.target.value);
    onDeviceStorageChange(e.target.value);
  };

  const handleCountrySelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
    onSelectedCountryChange(e.target.value);
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

      <div className={`px-10 mt-8`}>
        {/* Device Type */}
        <DeviceType
          handleDeviceType={handleDeviceType}
          deviceType={deviceType}
        />
        {(deviceType === "أخرى" || deviceType === "Other") && (
          <input
            // value={deviceType}
            placeholder={d("otherDevice")}
            onChange={(e) => onDeviceTypeChange(e.target.value)}
            className={`border border-secondary/70 px-2 py-1 rounded-md w-full mt-5`}
          />
        )}

        <div className={`mt-8`}></div>
        {/* Device Brand */}
        <DeviceBrand
          handleDeviceBrand={handleDeviceBrand}
          deviceBrand={deviceBrand}
        />
        {(deviceBrand === "أخرى" || deviceBrand === "Other") && (
          <input
            // value={deviceBrand}
            placeholder={d("otherDeviceBrand")}
            onChange={(e) => onDeviceBrandChange(e.target.value)}
            className={`border border-secondary/70 px-2 py-1 rounded-md w-full mt-5`}
          />
        )}

        <div className={`mt-8`}></div>
        {/* Device Price */}
        <Accordion
          title={t("priceRange")}
          content={
            <Ranger
              minValue={minPrice}
              maxValue={maxPrice}
              setMinValue={setMinPrice}
              setMaxValue={setMaxPrice}
              min="0"
              max="50000"
              handleInputChange={handlePriceChange}
              currency
            />
          }
        />

        <div className={`mt-8`}></div>
        {/* Device Condition */}
        <Accordion
          title={d("deviceCondition")}
          content={
            <DeviceCondition
              handleDeviceCondition={handleDeviceCondition}
              deviceCondition={deviceCondition}
            />
          }
        />

        <div className={`mt-8`}></div>
        {/* Device OS */}
        <DeviceOS handleDeviceOS={handleDeviceOS} deviceOS={deviceOS} />
        {(deviceOS === "أخرى" || deviceOS === "Other") && (
          <input
            // value={deviceOS}
            placeholder={d("otherDeviceOS")}
            onChange={(e) => onDeviceOSChange(e.target.value)}
            className={`border border-secondary/70 px-2 py-1 rounded-md w-full mt-5`}
          />
        )}

        <div className={`mt-8`}></div>
        {/* Device Storage */}
        <DeviceStorage
          handleDeviceStorage={handleDeviceStorage}
          deviceStorage={deviceStorage}
        />
        {(deviceStorage === "أخرى" || deviceStorage === "Other") && (
          <input
            // value={deviceStorage}
            placeholder={d("otherDeviceStorage")}
            onChange={(e) => onDeviceStorageChange(e.target.value)}
            className={`border border-secondary/70 px-2 py-1 rounded-md w-full mt-5`}
          />
        )}

        {/* Device Country and City */}
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

export default FilterDevices;
