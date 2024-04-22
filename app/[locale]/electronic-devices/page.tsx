"use client";

import SearchInput from "@/components/SearchInput";
import { DevicePost } from "@/types/post";
import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import { useLocale, useTranslations } from "next-intl";
import EDPostCard from "@/components/ElectronicDevices/EDPostCard";
import {
  filterDeviceBrand,
  filterDeviceCity,
  filterDeviceCondition,
  filterDeviceCountry,
  filterDeviceOS,
  filterDevicePrice,
  filterDeviceStorage,
  filterDeviceType,
  searchDevices,
} from "@/utils/searchDevices";
import LoadingPosts from "@/components/LoadingPosts";
import FilterDevices from "@/components/ElectronicDevices/FilterDevices";
import { svgFilter } from "@/components/svgsPath";

const ElectronicsDevices = () => {
  const t = useTranslations("devicesPage");
  const f = useTranslations("filters");
  const [posts, setPosts] = useState<DevicePost[]>([]); // Initialize posts as an empty array
  const [searchedDevicesPosts, setSearchedDevicesPosts] =
    useState<DevicePost[]>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterOn, setFilterOn] = useState(false);
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [deviceType, setDeviceType] = useState("");

  const [deviceBrand, setDeviceBrand] = useState("");

  const [minPrice, setMinPrice] = useState("10000");
  const [maxPrice, setMaxPrice] = useState("10000");

  const [deviceCondition, setDeviceCondition] = useState<string[]>([]);

  const [deviceOS, setDeviceOS] = useState("");

  const [deviceStorage, setDeviceStorage] = useState("");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [city, setCity] = useState("");

  const onDeviceTypeChange = (deviceType: string) => {
    setDeviceType(deviceType);
  };
  const onDeviceBrandChange = (deviceBrand: string) => {
    setDeviceBrand(deviceBrand);
  };
  const onMinPriceChange = (minPrice: string) => {
    setMinPrice(minPrice);
  };
  const onMaxPriceChange = (maxPrice: string) => {
    setMaxPrice(maxPrice);
  };
  const onDeviceConditionChange = (deviceCondition: string[]) => {
    setDeviceCondition(deviceCondition);
  };
  const onDeviceOSChange = (deviceOS: string) => {
    setDeviceOS(deviceOS);
  };
  const onDeviceStorageChange = (deviceStorage: string) => {
    setDeviceStorage(deviceStorage);
  };
  const onSelectedCountryChange = (selectedCountry: string) => {
    setSelectedCountry(selectedCountry);
  };
  const onCityChange = (city: string) => {
    setCity(city);
  };

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("electronicDevices")
      .onSnapshot((snapshot) => {
        const newPosts: DevicePost[] = []; // Create a new array to hold updated posts
        snapshot.forEach((doc) => {
          newPosts.push({
            postId: doc.id,
            ...doc.data(),
          } as DevicePost);
        });
        setPosts(newPosts.filter((post) => post.language === locale)); // Update posts state with the new data
        setSearchedDevicesPosts(
          newPosts.filter((post) => post.language === locale)
        );
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, [locale]);

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    setSearchedDevicesPosts(searchDevices(searchTerm, posts));
  }, [posts, searchTerm]);

  useEffect(() => {
    setSearchedDevicesPosts(filterDeviceType(deviceType, posts));
    setFilterOn(true);
  }, [deviceType, posts]);

  useEffect(() => {
    setSearchedDevicesPosts(filterDeviceBrand(deviceBrand, posts));
    setFilterOn(true);
  }, [deviceBrand, posts]);

  useEffect(() => {
    setSearchedDevicesPosts(filterDeviceCondition(deviceCondition, posts));
    setFilterOn(true);
  }, [deviceCondition, posts]);

  useEffect(() => {
    setSearchedDevicesPosts(filterDevicePrice(minPrice, maxPrice, posts));
    setFilterOn(true);
  }, [maxPrice, minPrice, posts]);

  useEffect(() => {
    setSearchedDevicesPosts(filterDeviceOS(deviceOS, posts));
    setFilterOn(true);
  }, [deviceOS, posts]);

  useEffect(() => {
    setSearchedDevicesPosts(filterDeviceStorage(deviceStorage, posts));
    setFilterOn(true);
  }, [deviceStorage, posts]);

  useEffect(() => {
    setSearchedDevicesPosts(filterDeviceCountry(selectedCountry, posts));
    setFilterOn(true);
  }, [posts, selectedCountry]);

  useEffect(() => {
    setSearchedDevicesPosts(filterDeviceCity(city, posts));
    setFilterOn(true);
  }, [city, posts]);

  if (!searchedDevicesPosts) {
    return (
      <div
        className={`flex flex-col w-full h-[700px] pt-10 px-2 md:px-10 lg:px-20`}
      >
        <p className="flex justify-center items-center mb-10 font-bold">
          {t("wantedDevices")} {posts.length}
        </p>

        <div className={`flex justify-center`}>
          <SearchInput onSearchTermChange={handleSearchTermChange} />
        </div>
        <LoadingPosts />
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col w-full h-fit pb-20 pt-10 px-2 md:px-10 lg:px-20 ${
        isArabic && "rtl"
      }`}
    >
      <p className="flex justify-center items-center mb-10 font-bold">
        {t("wantedDevices")} {searchedDevicesPosts.length}
      </p>

      <div className={`flex justify-center`}>
        <SearchInput onSearchTermChange={handleSearchTermChange} />
      </div>

      {searchedDevicesPosts.length > 0 || filterOn ? (
        searchTerm.length > 0 ? (
          <div className={`flex flex-row justify-center items-start w-full`}>
            <span className={`font-medium text-primary`}>{t("result")}</span>{" "}
            <span className={`font-bold text-secondary`}>{searchTerm}</span>
          </div>
        ) : (
          <div className={`w-full h-6`}></div>
        )
      ) : searchTerm.length > 0 ? (
        <div className={`flex flex-row justify-center items-start w-full`}>
          <span className={`font-medium text-primary`}>{t("noResult")}</span>{" "}
          <span className={`font-bold text-secondary`}>{searchTerm}</span>
        </div>
      ) : (
        <LoadingPosts />
      )}

      <div className={`flex flex-row gap-10 w-full`}>
        {(searchedDevicesPosts.length > 0 || filterOn) && (
          <div className={`lg:w-1/3 xl:1/4 hidden lg:block`}>
            <FilterDevices
              onDeviceTypeChange={onDeviceTypeChange}
              onDeviceBrandChange={onDeviceBrandChange}
              onMinPriceChange={onMinPriceChange}
              onMaxPriceChange={onMaxPriceChange}
              onDeviceConditionChange={onDeviceConditionChange}
              onDeviceOSChange={onDeviceOSChange}
              onDeviceStorageChange={onDeviceStorageChange}
              onSelectedCountryChange={onSelectedCountryChange}
              onCityChange={onCityChange}
            />
          </div>
        )}

        <div className={`flex flex-col justify-start items-center w-full`}>
          {showFilters ? (
            <div
              className={`flex flex-col justify-between z-10 h-screen w-screen bg-white pb-5 pt-20 absolute top-0 left-0`}
            >
              <FilterDevices
                onDeviceTypeChange={onDeviceTypeChange}
                onDeviceBrandChange={onDeviceBrandChange}
                onMinPriceChange={onMinPriceChange}
                onMaxPriceChange={onMaxPriceChange}
                onDeviceConditionChange={onDeviceConditionChange}
                onDeviceOSChange={onDeviceOSChange}
                onDeviceStorageChange={onDeviceStorageChange}
                onSelectedCountryChange={onSelectedCountryChange}
                onCityChange={onCityChange}
              />

              <div className={`flex justify-center mx-auto gap-2`}>
                <button
                  onClick={() => setShowFilters(false)}
                  className={`btn2 bg-secondary`}
                >
                  {f("done")}
                </button>
                <button
                  onClick={() => setShowFilters(false)}
                  className={`btn2 bg-[#d33]`}
                >
                  {f("cancel")}
                </button>
              </div>
            </div>
          ) : (
            <div className={`flex flex-col justify-center`}>
              {(searchedDevicesPosts.length > 0 || filterOn) && (
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex flex-row gap-1 lg:hidden`}
                >
                  <span>{svgFilter}</span>
                  <p
                    className={`text-primary text-lg md:text-xl lg:text-2xl font-semibold`}
                  >
                    {f("filter")}
                  </p>
                </button>
              )}

              <div
                className={`flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 justify-center items-center mx-auto gap-5`}
              >
                {searchedDevicesPosts
                  .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
                  .map((post) => (
                    <EDPostCard
                      key={post.postId} // Use post id as the key
                      posterName={post.poster.name}
                      posterImage={post.poster.profileImageSrc}
                      post={post}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ElectronicsDevices;
