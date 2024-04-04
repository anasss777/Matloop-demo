"use client";

import { DevicePost } from "@/types/post";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { svgCloseDark } from "../svgsPath";
import DeviceType from "@/components/ElectronicDevices/DeviceType";
import DeviceBrand from "@/components/ElectronicDevices/DeviceBrand";
import Ranger from "@/components/Cars/Ranger";
import DeviceCondition from "@/components/ElectronicDevices/DeviceCondition";
import DeviceOS from "@/components/ElectronicDevices/DeviceOS";
import DeviceStorage from "@/components/ElectronicDevices/DeviceStorage";
import CountriesSelector from "@/components/CountriesSelector";
import Swal from "sweetalert2";
import { EditDevicePost } from "@/utils/devicePost";

type Props = {
  openEditPost: boolean;
  setOpenEditPost: React.Dispatch<React.SetStateAction<boolean>>;
  post: DevicePost;
};

const EDEditPost = ({ openEditPost, setOpenEditPost, post }: Props) => {
  const t = useTranslations("newElectonicDevicePost");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [postTitle, setPostTitle] = useState(post.postTitle);

  const [deviceType, setDeviceType] = useState(post.deviceType);
  const [theType, setTheType] = useState(post.deviceType);

  const [deviceBrand, setDeviceBrand] = useState(post.deviceBrand);
  const [theBrand, setTheBrand] = useState(post.deviceBrand);

  const [minPrice, setMinPrice] = useState(String(post.priceRange[0]));
  const [maxPrice, setMaxPrice] = useState(String(post.priceRange[1]));

  const [deviceCondition, setDeviceCondition] = useState(post.deviceCondition);

  const [deviceOS, setDeviceOS] = useState(post.deviceOS);
  const [theOS, setTheOS] = useState(post.deviceOS);

  const [deviceStorage, setDeviceStorage] = useState(post.deviceStorage);
  const [theStorage, setTheStorage] = useState(post.deviceStorage);

  const [selectedCountry, setSelectedCountry] = useState(
    post.region.split(", ")[0]
  );
  const [city, setCity] = useState(post.region.split(", ")[1]);

  const [description, setDescription] = useState(post.description);

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

  return (
    <div
      className={`flex flex-col justify-start items-center gap-1 bg-gray-200 m-5 rounded-lg overflow-y-auto max-w-[400px] h-[90vh] w-full
        mx-auto p-2 ${isArabic && "rtl"}`}
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
          {/* Device type */}
          <h2 className={`text-primary text-lg font-bold mb-4 mt-20`}>
            {t("deviceType")}
          </h2>
          <DeviceType
            handleDeviceType={handleDeviceType}
            deviceType={deviceType}
          />
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
            placeholder={t("description")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`border border-secondary/70 px-2 py-1 rounded-md mb-20 w-full`}
          ></textarea>

          <div className={`flex flex-row gap-2 mb-10 ${!isArabic && "mb20"}`}>
            <button
              className={`btn2 bg-secondary shadow-lg`}
              onClick={() => {
                EditDevicePost({
                  postId: post.postId,
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

export default EDEditPost;
