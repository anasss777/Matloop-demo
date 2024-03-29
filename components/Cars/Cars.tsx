"use client";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import CarType from "./CarType";
import Ranger from "./Ranger";
import GearStickType from "./GearStickType";
import CountriesSelector from "../CountriesSelector";
import FuelType from "./FuelType";
import BrandSelector from "./BrandSelector";
import { addCarPost } from "@/utils/post";
import CategorySelector from "../CategorySelector";
import firebase from "@/firebase";
import { useRouter } from "next/navigation";

export const Cars = () => {
  const t = useTranslations("newPost");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [poster, setPoster] = useState<any>();

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const docRef = firebase
          .firestore()
          .collection("profiles")
          .doc(user.uid);
        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              setPoster(doc.data());
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      } else {
        router.push("/sign-up");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  const [carBrand, setCarBrand] = useState("");

  const [carType, setCarType] = useState<string[]>([]);

  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("0");

  const currentYear = new Date().getFullYear();
  const [minYear, setMinYear] = useState("1886");
  const [maxYear, setMaxYear] = useState(String(currentYear));

  const [minDistance, setMinDistance] = useState("0");
  const [maxDistance, setMaxDistance] = useState("0");
  const [gearType, setGearType] = useState<string[]>([]);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [city, setCity] = useState("");

  const [fuelType, setFuelType] = useState<string[]>([]);

  const [description, setDescription] = useState("");

  const [postTitle, setPostTitle] = useState("");

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
      className={`flex flex-col justify-center items-center px-8 ${
        isArabic && "rtl"
      }`}
    >
      {/* Choose category */}
      <CategorySelector />

      <h2 className={`text-primary text-lg font-bold mb-4 mt-20`}>
        {t("postTitle")}
      </h2>
      <input
        value={postTitle}
        placeholder={t("postTitlePlaceholder")}
        onChange={(e) => setPostTitle(e.target.value)}
        className={`border border-secondary/70 px-2 py-1 rounded-md w-full sm:w-[70%] md:w-[50%] lg:w-[30%]`}
      />

      {/* Choose Car Brand */}
      <BrandSelector handleBrandSelected={handleCarBrand} carBrand={carBrand} />

      {/* Choose Car Type */}
      <h2 className={`text-primary text-lg font-bold mt-20`}>{t("carType")}</h2>
      <CarType handleCheckboxChange={handleCarTypeChecked} carType={carType} />

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
      <h2 className={`text-primary text-lg font-bold mt-20`}>
        {t("maxDistance")}
      </h2>

      <Ranger />

      {/* <div className={`flex flex-col gap-2 justify-start mt-5 mb-20`}>
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
            </div> */}

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
        cols={50}
        placeholder={t("description")}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={`border border-secondary/70 px-2 py-1 rounded-md mb-20 w-full sm:w-[70%] md:w-[50%] lg:w-[30%]`}
      ></textarea>

      <button
        className={`btn2 bg-secondary mb-20`}
        onClick={() =>
          addCarPost({
            poster,
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
        {t("submit")}
      </button>
    </div>
  );
};