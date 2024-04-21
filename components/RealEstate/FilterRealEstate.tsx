"use client";

import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { svgDown, svgFilter, svgTop } from "../svgsPath";
import CountriesSelector from "../CountriesSelector";
import Ranger from "../Cars/Ranger";
import Accordion from "../Accordion";
import PropertyType from "./PropertyType";
import OwnershipType from "./OwnershipType";
import RentType from "./RentType";
import NumberOfRooms from "./NumberOfRooms";

type Props = {
  onPropertyTypeChange: (type: string) => void;
  onOwnershipTypeChange: (type: string) => void;
  onRentTypeChange: (type: string) => void;
  onMinPriceChange: (min: string) => void;
  onMaxPriceChange: (max: string) => void;
  onRoomsChange: (rooms: string) => void;
  onMinAgeChange: (min: string) => void;
  onMaxAgeChange: (max: string) => void;
  onCountryChange: (country: string) => void;
  onCityChange: (city: string) => void;
};

const FilterRealEstates = ({
  onPropertyTypeChange,
  onOwnershipTypeChange,
  onRentTypeChange,
  onMinPriceChange,
  onMaxPriceChange,
  onRoomsChange,
  onMinAgeChange,
  onMaxAgeChange,
  onCountryChange,
  onCityChange,
}: Props) => {
  const t = useTranslations("filters");
  const r = useTranslations("newRealEstatePost");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [propertyType, setPropertyType] = useState("");

  const [ownershipType, setOwnershipType] = useState("");
  const [rentType, setRentType] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [city, setCity] = useState("");

  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("5000000");

  const [numberOfRooms, setNumberOfRooms] = useState("");

  const [minAge, setMinAge] = useState("0");
  const [maxAge, setMaxAge] = useState("100");

  const handlePropertyType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const typeValue = e.target.value;
    setPropertyType(typeValue);
    onPropertyTypeChange(typeValue);
  };

  const handleOwnershipType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOwnershipType(e.target.value);
    onOwnershipTypeChange(e.target.value);
  };

  const handleRentType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRentType(e.target.value);
    onRentTypeChange(e.target.value);
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

  const handleCountrySelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
    onCountryChange(e.target.value);
  };

  useEffect(() => {
    onCityChange(city);
  }, [city]);

  const handleNumberOfRooms = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNumberOfRooms(e.target.value);
    onRoomsChange(e.target.value);
  };

  const handleAgeChange = () => {
    let minA = parseInt(minAge);
    let maxA = parseInt(maxAge);

    if (minA < 0) {
      alert("Minimum age cannot be less than 0");
      setMinAge("0");
      onMinAgeChange("0");
      minA = 0;
    }

    if (maxA > 100) {
      alert("Maximum age cannot be greater than 100");
      setMaxAge("100");
      onMaxAgeChange("100");
      maxA = 100;
    }

    if (minA > maxA) {
      setMinAge(maxA.toString());
      onMinAgeChange(maxA.toString());
      minA = maxA;

      if (minA < 0) {
        setMinAge("0");
        onMinAgeChange("0");
        minA = 0;
      }
    }

    onMinAgeChange(minA.toString());
    onMaxAgeChange(maxA.toString());
  };

  return (
    <div
      className={`bg-white h-fit w-full py-5 lg:rounded-xl lg:shadow-Card sticky top-14 mt-5 lg:border ${
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
        {/* Property type */}
        <PropertyType
          handlePropertyType={handlePropertyType}
          propertyType={propertyType}
        />
        {(propertyType === "أخرى" || propertyType === "Other") && (
          <input
            placeholder={r("otherProperty")}
            onChange={(e) => onPropertyTypeChange(e.target.value)}
            className={`border border-secondary/70 px-2 py-1 rounded-md w-full mt-5`}
          />
        )}

        {/* Ownership type and Rent type */}
        <div className={`mt-8`}></div>
        <OwnershipType
          handleOwnershipType={handleOwnershipType}
          ownershipType={ownershipType}
        />

        {/* Choose rent duartion */}
        {(ownershipType === "إيجار" || ownershipType === "Rent") && (
          <RentType handleRentType={handleRentType} rentType={rentType} />
        )}

        {/* Price Range */}
        <Accordion
          title={r("priceRange")}
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

        {/* Number of rooms */}
        <div className={`mt-8`}></div>
        <NumberOfRooms
          handleNumberOfRooms={handleNumberOfRooms}
          numberOfRooms={numberOfRooms}
        />
        {(numberOfRooms === "أخرى" || numberOfRooms === "Other") && (
          <input
            placeholder={r("otherNumberOfRooms")}
            onChange={(e) => onRoomsChange(e.target.value)}
            className={`border border-secondary/70 px-2 py-1 rounded-md w-full mt-5`}
          />
        )}

        {/* Property age */}
        <Accordion
          title={r("ageRange")}
          content={
            <Ranger
              minValue={minAge}
              maxValue={maxAge}
              setMinValue={setMinAge}
              setMaxValue={setMaxAge}
              min="0"
              max="100"
              handleInputChange={handleAgeChange}
              year
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

export default FilterRealEstates;
