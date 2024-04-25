"use client";

import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { svgCloseDark } from "../svgsPath";
import Swal from "sweetalert2";
import { RealEstatePost } from "@/types/post";
import PropertyType from "./PropertyType";
import OwnershipType from "./OwnershipType";
import RentType from "./RentType";
import CountriesSelector from "../CountriesSelector";
import Ranger from "../Cars/Ranger";
import NumberOfRooms from "./NumberOfRooms";
import { EditRealEstatePost } from "@/utils/realEstatePost";

type Props = {
  openEditPost: boolean;
  setOpenEditPost: React.Dispatch<React.SetStateAction<boolean>>;
  post: RealEstatePost;
};

const RSEditPost = ({ openEditPost, setOpenEditPost, post }: Props) => {
  const t = useTranslations("newRealEstatePost");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [postTitle, setPostTitle] = useState(post.postTitle);

  const [propertyType, setPropertyType] = useState(post.propertyType);
  const [theProperty, setTheProperty] = useState(post.propertyType);

  const [ownershipType, setOwnershipType] = useState(post.ownershipType);
  const [rentType, setRentType] = useState(post.rentType);

  const [selectedCountry, setSelectedCountry] = useState(
    post.address.split(", ")[0]
  );
  const [city, setCity] = useState(post.address.split(", ")[1]);

  const [minPrice, setMinPrice] = useState(String(post.priceRange[0]));
  const [maxPrice, setMaxPrice] = useState(String(post.priceRange[1]));

  const [numberOfRooms, setNumberOfRooms] = useState(post.numberOfRooms);
  const [theRooms, setTheRooms] = useState(post.numberOfRooms);

  const [minAge, setMinAge] = useState(String(post.ageRange[0]));
  const [maxAge, setMaxAge] = useState(String(post.ageRange[1]));
  const [description, setDescription] = useState(post.description);

  const handlePropertyType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPropertyType(e.target.value);
  };

  const handleOwnershipType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOwnershipType(e.target.value);
  };

  const handleRentType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (ownershipType === "إيجار" || ownershipType === "rent") {
      setRentType(e.target.value);
    } else {
      setRentType("");
    }
  };

  const handleCountrySelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
  };

  const handlePriceChange = () => {
    let minp = parseInt(minPrice);
    let maxp = parseInt(maxPrice);

    if (minp < 0) {
      alert("Minimum price cannot be less than 0");
      setMinPrice("0");
      minp = 0;
    }

    if (maxp > 1000000000) {
      alert("Maximum price cannot be greater than 1000000000");
      setMaxPrice("1000000000");
      maxp = 1000000000;
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

  const handleNumberOfRooms = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNumberOfRooms(e.target.value);
  };

  const handleAgeChange = () => {
    let minA = parseInt(minAge);
    let maxA = parseInt(maxAge);

    if (minA < 0) {
      alert("Minimum age cannot be less than 0");
      setMinAge("0");
      minA = 0;
    }

    if (maxA > 100) {
      alert("Maximum age cannot be greater than 100");
      setMaxAge("100");
      maxA = 100;
    }

    if (minA > maxA) {
      setMinAge(maxA.toString());
      minA = maxA;

      if (minA < 0) {
        setMinAge("0");
        minA = 0;
      }
    }
  };

  useEffect(() => {
    setTheProperty(propertyType);
  }, [propertyType]);

  useEffect(() => {
    setTheRooms(numberOfRooms);
  }, [numberOfRooms]);

  return (
    <div
      className={`flex flex-col justify-start items-center gap-1 bg-gray-200 dark:bg-gray-800 m-5 rounded-lg overflow-y-auto max-w-[400px]
      h-[90vh] w-full mx-auto p-2 ${isArabic && "rtl"}`}
    >
      <div className={`flex flex-col justify-center w-full`}>
        <button onClick={() => setOpenEditPost(!openEditPost)}>
          {svgCloseDark}
        </button>

        <div
          className={`flex flex-col justify-start items-center px-8 ${
            isArabic && "rtl"
          }`}
        >
          {/* Post title */}
          <h2 className={`text-primary text-lg font-bold mb-4 mt-4`}>
            {t("postTitle")}
          </h2>
          <input
            value={postTitle}
            placeholder={t("postTitlePlaceholder")}
            onChange={(e) => setPostTitle(e.target.value)}
            className={`border border-secondary/70 px-2 py-1 rounded-md w-full`}
          />

          {/* Choose Property Type */}
          <h2 className={`text-primary text-lg font-bold mb-4 mt-20`}>
            {t("propertyType")}
          </h2>
          <PropertyType
            handlePropertyType={handlePropertyType}
            propertyType={propertyType}
          />
          {(propertyType === "أخرى" || propertyType === "Others") && (
            <input
              placeholder={t("otherProperty")}
              onChange={(e) => setTheProperty(e.target.value)}
              className={`border border-secondary/70 px-2 py-1 rounded-md w-full sm:w-[70%] md:w-[50%] lg:w-[30%] mt-5`}
            />
          )}

          {/* Choose Ownership Type */}
          <h2 className={`text-primary text-lg font-bold mb-4 mt-20`}>
            {t("ownershipType")}
          </h2>
          <OwnershipType
            handleOwnershipType={handleOwnershipType}
            ownershipType={ownershipType}
          />

          {/* Choose rent duartion */}
          {(ownershipType === "إيجار" || ownershipType === "rent") && (
            <RentType handleRentType={handleRentType} rentType={rentType} />
          )}

          {/* Price Range */}
          <h2 className={`text-primary text-lg font-bold mt-20`}>
            {t("priceRange")}
          </h2>
          <Ranger
            minValue={minPrice}
            maxValue={maxPrice}
            setMinValue={setMinPrice}
            setMaxValue={setMaxPrice}
            min="0"
            max="100000000"
            handleInputChange={handlePriceChange}
            currency
          />

          {/* Number of rooms */}
          <h2 className={`text-primary text-lg font-bold mb-4 mt-20`}>
            {t("numberOfRooms")}
          </h2>
          <NumberOfRooms
            handleNumberOfRooms={handleNumberOfRooms}
            numberOfRooms={numberOfRooms}
          />
          {(numberOfRooms === "أخرى" || numberOfRooms === "Others") && (
            <input
              placeholder={t("otherNumberOfRooms")}
              onChange={(e) => setTheRooms(e.target.value)}
              className={`border border-secondary/70 px-2 py-1 rounded-md w-full sm:w-[70%] md:w-[50%] lg:w-[30%] mt-5`}
            />
          )}

          {/* Property age */}
          <h2 className={`text-primary text-lg font-bold mt-20`}>
            {t("ageRange")}
          </h2>
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

          {/* Address */}
          <CountriesSelector
            handleCountrySelected={handleCountrySelected}
            city={city}
            setCity={setCity}
            selectedCountry={selectedCountry}
          />

          {/* Other Specs */}
          <h2 className={`text-primary text-lg font-bold mb-4 mt-20`}>
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

          <div className={`flex flex-row gap-2 mb-10 ${!isArabic && "mb20"}`}>
            <button
              className={`btn2 bg-secondary shadow-lg`}
              onClick={() => {
                EditRealEstatePost({
                  postId: post.postId,
                  postTitle,
                  propertyType: theProperty,
                  ownershipType,
                  rentType,
                  selectedCountry,
                  city,
                  minPrice,
                  maxPrice,
                  numberOfRooms: theRooms,
                  minAge,
                  maxAge,
                  description,
                });
                Swal.fire({
                  text: t("postEdited"),
                  icon: "success",
                  confirmButtonColor: "#4682b4",
                  confirmButtonText: t("ok"),
                }).then((result) => {
                  if (result.isConfirmed) {
                    setOpenEditPost(!openEditPost);
                  }
                });
              }}
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

export default RSEditPost;
