"use client";

import CategorySelector from "@/components/CategorySelector";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import DeviceType from "@/components/ElectronicDevices/DeviceType";
import DeviceBrand from "@/components/ElectronicDevices/DeviceBrand";
import Ranger from "@/components/Cars/Ranger";
import DeviceCondition from "@/components/ElectronicDevices/DeviceCondition";
import DeviceOS from "@/components/ElectronicDevices/DeviceOS";
import DeviceStorage from "@/components/ElectronicDevices/DeviceStorage";
import CountriesSelector from "@/components/CountriesSelector";
import { addDevicePost } from "@/utils/devicePost";
import { svgLoading } from "@/components/svgsPath";

const ElectronicDevice = () => {
  const t = useTranslations("newElectonicDevicePost");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const [poster, setPoster] = useState<any>();

  const [postTitle, setPostTitle] = useState("");

  const [deviceType, setDeviceType] = useState("");
  const [theType, setTheType] = useState("");

  const [deviceBrand, setDeviceBrand] = useState("");
  const [theBrand, setTheBrand] = useState("");

  const [minPrice, setMinPrice] = useState("10000");
  const [maxPrice, setMaxPrice] = useState("10000");

  const [deviceCondition, setDeviceCondition] = useState<string[]>([]);

  const [deviceOS, setDeviceOS] = useState("");
  const [theOS, setTheOS] = useState("");

  const [deviceStorage, setDeviceStorage] = useState("");
  const [theStorage, setTheStorage] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [city, setCity] = useState("");

  const [description, setDescription] = useState("");

  const handleDeviceType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDeviceType(e.target.value);
  };

  const handleDeviceBrand = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDeviceBrand(e.target.value);
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
      alert("Maximum price cannot be greater than 5000000");
      setMaxPrice("5000000");
      maxp = 5000000;
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

  const handleDeviceCondition = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setDeviceCondition((prevDeviceCondition) => [
        ...prevDeviceCondition,
        value,
      ]);
    } else {
      setDeviceCondition((prevDeviceCondition) =>
        prevDeviceCondition.filter((type) => type !== value)
      );
    }
  };

  const handleDeviceOS = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDeviceOS(e.target.value);
  };

  const handleDeviceStorage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDeviceStorage(e.target.value);
  };

  const handleCountrySelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
  };

  useEffect(() => {
    setTheType(deviceType);
  }, [deviceType]);

  useEffect(() => {
    setTheBrand(deviceBrand);
  }, [deviceBrand]);

  useEffect(() => {
    setTheOS(deviceOS);
  }, [deviceOS]);

  useEffect(() => {
    setTheStorage(deviceStorage);
  }, [deviceStorage]);

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
      <h2 className={`text-primary text-lg font-bold mb-4 mt-20`}>
        {t("postTitle")}
      </h2>
      <input
        value={postTitle}
        placeholder={t("postTitlePlaceholder")}
        onChange={(e) => setPostTitle(e.target.value)}
        className={`border border-secondary/70 px-2 py-1 rounded-md w-full sm:w-[70%] md:w-[50%] lg:w-[30%]`}
      />

      {/* Device type */}
      <h2 className={`text-primary text-lg font-bold mb-4 mt-20`}>
        {t("deviceType")}
      </h2>
      <DeviceType handleDeviceType={handleDeviceType} deviceType={deviceType} />
      {(deviceType === "أخرى" || deviceType === "Others") && (
        <input
          // value={deviceType}
          placeholder={t("otherDevice")}
          onChange={(e) => setTheType(e.target.value)}
          className={`border border-secondary/70 px-2 py-1 rounded-md w-full sm:w-[70%] md:w-[50%] lg:w-[30%] mt-5`}
        />
      )}

      {/* Device brand */}
      <h2 className={`text-primary text-lg font-bold mb-4 mt-20`}>
        {t("deviceBrand")}
      </h2>
      <DeviceBrand
        handleDeviceBrand={handleDeviceBrand}
        deviceBrand={deviceBrand}
      />
      {(deviceBrand === "أخرى" || deviceBrand === "Others") && (
        <input
          // value={deviceBrand}
          placeholder={t("otherDeviceBrand")}
          onChange={(e) => setTheBrand(e.target.value)}
          className={`border border-secondary/70 px-2 py-1 rounded-md w-full sm:w-[70%] md:w-[50%] lg:w-[30%] mt-5`}
        />
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
        max="50000"
        handleInputChange={handlePriceChange}
        currency
      />

      {/* Device condition */}
      <h2 className={`text-primary text-lg font-bold mt-20`}>
        {t("deviceCondition")}
      </h2>
      <DeviceCondition
        handleDeviceCondition={handleDeviceCondition}
        deviceCondition={deviceCondition}
      />

      {/* Operating System */}
      <h2 className={`text-primary text-lg font-bold mb-4 mt-20`}>
        {t("deviceOS")}
      </h2>
      <DeviceOS handleDeviceOS={handleDeviceOS} deviceOS={deviceOS} />
      {(deviceOS === "أخرى" || deviceOS === "Others") && (
        <input
          // value={deviceOS}
          placeholder={t("otherDeviceOS")}
          onChange={(e) => setTheOS(e.target.value)}
          className={`border border-secondary/70 px-2 py-1 rounded-md w-full sm:w-[70%] md:w-[50%] lg:w-[30%] mt-5`}
        />
      )}

      {/* Device Storage */}
      <h2 className={`text-primary text-lg font-bold mb-4 mt-20`}>
        {t("deviceStorage")}
      </h2>
      <DeviceStorage
        handleDeviceStorage={handleDeviceStorage}
        deviceStorage={deviceStorage}
      />
      {(deviceStorage === "أخرى" || deviceStorage === "Others") && (
        <input
          // value={deviceStorage}
          placeholder={t("otherDeviceStorage")}
          onChange={(e) => setTheStorage(e.target.value)}
          className={`border border-secondary/70 px-2 py-1 rounded-md w-full sm:w-[70%] md:w-[50%] lg:w-[30%] mt-5`}
        />
      )}

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

      {/* Submit button */}
      <button
        className={`btn2 bg-secondary mb-20`}
        onClick={() => {
          addDevicePost({
            poster,
            postTitle,
            deviceType: theType,
            deviceBrand: theBrand,
            minPrice,
            maxPrice,
            deviceCondition,
            deviceOS: theOS,
            deviceStorage: theStorage,
            selectedCountry,
            city,
            description,
          });
          !isLoading && router.push("/electronic-devices");
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

export default ElectronicDevice;
