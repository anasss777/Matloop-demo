"use client";

import Ranger from "@/components/Cars/Ranger";
import CategorySelector from "@/components/CategorySelector";
import CountriesSelector from "@/components/CountriesSelector";
import NumberOfRooms from "@/components/RealEstate/NumberOfRooms";
import OwnershipType from "@/components/RealEstate/OwnershipType";
import PropertyType from "@/components/RealEstate/PropertyType";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import { svgLoading } from "@/components/svgsPath";
import { addRealEstatePost } from "@/utils/realEstatePost";
import RentType from "@/components/RealEstate/RentType";

const RealEstate = () => {
  const t = useTranslations("newRealEstatePost");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const [poster, setPoster] = useState<any>();

  const [postTitle, setPostTitle] = useState("");

  const [propertyType, setPropertyType] = useState("");
  const [theProperty, setTheProperty] = useState("");

  const [ownershipType, setOwnershipType] = useState("");
  const [rentType, setRentType] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [city, setCity] = useState("");

  const [minPrice, setMinPrice] = useState("100000");
  const [maxPrice, setMaxPrice] = useState("100000");

  const [numberOfRooms, setNumberOfRooms] = useState("");
  const [theRooms, setTheRooms] = useState("");

  const [minAge, setMinAge] = useState("100");
  const [maxAge, setMaxAge] = useState("100");

  const [description, setDescription] = useState("");

  const handlePropertyType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPropertyType(e.target.value);
  };

  const handleOwnershipType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOwnershipType(e.target.value);
  };

  const handleRentType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRentType(e.target.value);
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

  useEffect(() => {
    // Simulate a 2-second loading delay
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    // Clear the timer if the component unmounts
    return () => clearTimeout(loadingTimer);
  }, []);

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

  return (
    <div
      className={`flex flex-col justify-center items-center px-8 ${
        isArabic && "rtl"
      }`}
    >
      {/* Choose category */}
      <CategorySelector />

      {/* Post title */}
      <h2 className={`text-primary text-lg font-bold mb-4 mt-20 text-center`}>
        {t("postTitle")}
      </h2>
      <input
        value={postTitle}
        placeholder={t("postTitlePlaceholder")}
        onChange={(e) => setPostTitle(e.target.value)}
        className={`border border-secondary/70 px-2 py-1 rounded-md w-full sm:w-[70%] md:w-[50%] lg:w-[30%]`}
      />

      {/* Choose Property Type */}
      <h2 className={`text-primary text-lg font-bold mb-4 mt-20`}>
        {t("propertyType")}
      </h2>
      <PropertyType
        handlePropertyType={handlePropertyType}
        propertyType={propertyType}
      />
      {(propertyType === "أخرى" || propertyType === "Other") && (
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
      {(ownershipType === "إيجار" || ownershipType === "Rent") && (
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
      {(numberOfRooms === "أخرى" || numberOfRooms === "Other") && (
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
        cols={50}
        placeholder={t("description")}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={`border border-secondary/70 px-2 py-1 rounded-md mb-20 w-full sm:w-[70%] md:w-[50%] lg:w-[30%]`}
      ></textarea>

      {/* Submit button */}
      <button
        className={`btn2 bg-secondary mb-20`}
        onClick={() => {
          addRealEstatePost({
            poster,
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
          !isLoading && router.push("/real-estate");
        }}
      >
        {isLoading ? (
          <span className={`flex flex-row items-center gap-1`}>
            {t("loading")} {svgLoading}
          </span>
        ) : (
          <span className={`flex flex-row items-center gap-1`}>
            {t("submit")}
          </span>
        )}
      </button>
    </div>
  );
};

export default RealEstate;
