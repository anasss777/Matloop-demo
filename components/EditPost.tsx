"use client";

import React, { useState } from "react";
import { svgClose, svgCloseDark } from "./svgsPath";
import { CarPost } from "@/types/post";
import { useLocale, useTranslations } from "next-intl";
import CategorySelector from "./CategorySelector";
import BrandSelector from "./Cars/BrandSelector";
import CarType from "./Cars/CarType";
import Ranger from "./Cars/Ranger";
import GearStickType from "./Cars/GearStickType";
import FuelType from "./Cars/FuelType";
import CountriesSelector from "./CountriesSelector";
import { EditCarPost } from "@/utils/post";

type Props = {
  openEditPost: boolean;
  setOpenEditPost: React.Dispatch<React.SetStateAction<boolean>>;
  post: CarPost;
};

const EditPost = ({ openEditPost, setOpenEditPost, post }: Props) => {
  const t = useTranslations("newPost");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [carBrand, setCarBrand] = useState(post.carBrand);

  const [carType, setCarType] = useState(post.carType);

  const [minPrice, setMinPrice] = useState(String(post.priceRange[0]));
  const [maxPrice, setMaxPrice] = useState(String(post.priceRange[1]));

  const currentYear = new Date().getFullYear();
  const [minYear, setMinYear] = useState(String(post.yearRange[0]));
  const [maxYear, setMaxYear] = useState(String(post.yearRange[1]));

  const [maxDistance, setMaxDistance] = useState(post.maxDistance);
  const [gearType, setGearType] = useState(post.gearType);

  const [selectedCountry, setSelectedCountry] = useState(
    post.region.split(", ")[0]
  );
  const [city, setCity] = useState(post.region.split(", ")[1]);

  const [fuelType, setFuelType] = useState(post.fuelType);

  const [description, setDescription] = useState(post.description);

  const [postTitle, setPostTitle] = useState(post.postTitle);

  const handleCarBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCarBrand(e.target.options[e.target.selectedIndex].text);
  };

  const handleCarTypeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setCarType((prevCarType) => [...prevCarType, value]);
    } else {
      setCarType((prevCarType) => prevCarType.filter((type) => type !== value));
    }
  };

  const handlePriceChange = () => {
    let minp = parseInt(minPrice);
    let maxp = parseInt(maxPrice);

    if (minp < 0) {
      alert("Minimum price cannot be less than 0");
      setMinPrice("0");
      minp = 0;
    }

    if (maxp > 500000) {
      alert("Maximum price cannot be greater than 500000");
      setMaxPrice("500000");
      maxp = 500000;
    }

    if (minp > maxp) {
      setMinPrice(maxp.toString());
      minp = maxp;

      if (minp < 0) {
        setMinPrice("0");
        minp = 0;
      }
    }
  };

  const handleYearChange = () => {
    let miny = parseInt(minYear);
    let maxy = parseInt(maxYear);

    if (miny < 1886) {
      alert("Minimum year cannot be less than 1886");
      setMinYear("1886");
      miny = 1886;
    }

    if (maxy > currentYear) {
      alert("Maximum year cannot be greater than currentYear");
      setMaxYear(String(currentYear));
      maxy = currentYear;
    }

    if (miny > maxy) {
      setMinYear(maxy.toString());
      miny = maxy;

      if (miny < 1886) {
        setMinYear("1886");
        miny = 1886;
      }
    }
  };

  const handleGearTypeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setGearType((prevGearType) => [...prevGearType, value]);
    } else {
      setGearType((prevGearType) =>
        prevGearType.filter((type) => type !== value)
      );
    }
  };

  const handlefuelTypeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setFuelType((prevFuelType) => [...prevFuelType, value]);
    } else {
      setFuelType((prevFuelType) =>
        prevFuelType.filter((type) => type !== value)
      );
    }
  };

  const handleCountrySelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
  };

  return (
    <div
      className={`flex flex-col justify-start items-center gap-1 bg-gray-200 m-5 rounded-md overflow-y-auto h-screen w-full mx-auto p-2 ${
        isArabic && "rtl"
      }`}
    >
      <div
        className={`flex flex-col justify-center items-cenjustify-center w-full`}
      >
        <button onClick={() => setOpenEditPost(!openEditPost)}>
          {svgCloseDark}
        </button>

        <div
          className={`flex flex-col justify-start items-center px-8 ${
            isArabic && "rtl"
          }`}
        >
          <h2 className={`text-primary text-lg font-bold mb-4 mt-4`}>
            {t("postTitle")}
          </h2>
          <input
            value={postTitle}
            placeholder={t("postTitlePlaceholder")}
            onChange={(e) => setPostTitle(e.target.value)}
            className={`border border-secondary/70 px-2 py-1 rounded-md w-full`}
          />

          {/* Choose Car Brand */}
          <BrandSelector
            handleBrandSelected={handleCarBrand}
            carBrand={carBrand}
          />
          <p className={`text-secondary font-semibold`}>{carBrand}</p>

          {/* Choose Car Type */}
          <h2 className={`text-primary text-lg font-bold mt-20`}>
            {t("carType")}
          </h2>
          <CarType
            handleCheckboxChange={handleCarTypeChecked}
            carType={carType}
          />

          {/* Price Range */}
          <h2 className={`text-primary text-lg font-bold mt-20`}>
            {t("carPriceRange")}
          </h2>
          <Ranger
            minValue={minPrice}
            maxValue={maxPrice}
            setMinValue={setMinPrice}
            setMaxValue={setMaxPrice}
            min="0"
            max="500000"
            handleInputChange={handlePriceChange}
            currency
          />

          {/* Year Range */}
          <h2 className={`text-primary text-lg font-bold mt-20`}>
            {t("carYearRange")}
          </h2>
          <Ranger
            minValue={minYear}
            maxValue={maxYear}
            setMinValue={setMinYear}
            setMaxValue={setMaxYear}
            min="1886"
            max={String(currentYear)}
            handleInputChange={handleYearChange}
          />

          {/* Max Distance */}
          <h2 className={`text-primary text-lg font-bold mt-20 text-center`}>
            {t("maxDistance")}
          </h2>
          <div className={`flex flex-col gap-2 justify-start mt-5 mb-20`}>
            <span
              className={`flex justify-start text-secondary font-bold ml-2 ${
                isArabic && "mr-2"
              }`}
            >
              {`${maxDistance} ${t("kiloMeter")}`}
            </span>
            <input
              type="number"
              value={maxDistance}
              onChange={(e) => setMaxDistance(e.target.value)}
              className="w-full border border-secondary/70 px-2 py-1 rounded-md ltr"
            />
          </div>

          {/* Gear Type */}
          <h2 className={`text-primary text-lg font-bold`}>{t("gearType")}</h2>
          <GearStickType
            handleCheckboxChange={handleGearTypeChecked}
            gearType={gearType}
          />

          <h2 className={`text-primary text-lg font-bold mt-20`}>
            {t("fuelType")}
          </h2>
          <FuelType
            handlefuelTypeChecked={handlefuelTypeChecked}
            fuelType={fuelType}
          />

          {/* Select Country */}
          <CountriesSelector
            handleCountrySelected={handleCountrySelected}
            city={city}
            setCity={setCity}
            selectedCountry={selectedCountry}
          />

          {/* Other Specs */}
          <h2 className={`text-primary text-lg font-bold mb-4`}>
            {t("otherSpecs")}
          </h2>
          <textarea
            id="description"
            name="description"
            rows={4}
            placeholder={t("description")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`border border-secondary/70 px-2 py-1 rounded-md mb-20 w-full`}
          ></textarea>

          <div className={`flex flex-row gap-2  mb-10`}>
            <button
              className={`btn2 bg-secondary shadow-lg`}
              onClick={() =>
                EditCarPost({
                  postId: post.postId,
                  postTitle,
                  carBrand,
                  carType,
                  minPrice,
                  maxPrice,
                  minYear,
                  maxYear,
                  maxDistance,
                  gearType,
                  selectedCountry,
                  city,
                  fuelType,
                  description,
                })
              }
            >
              {t("edit")}
            </button>

            <button
              onClick={() => setOpenEditPost(!openEditPost)}
              className={`btn2 bg-red-600 shadow-lg`}
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
