"use client";

import PostCard from "@/components/PostCard";
import SearchInput from "@/components/SearchInput";
import { CarPost } from "@/types/post";
import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import { useLocale, useTranslations } from "next-intl";
import {
  filterCarBrand,
  filterCarCity,
  filterCarCountry,
  filterCarDistance,
  filterCarPrice,
  filterCarType,
  filterCarYear,
  filterFuelType,
  filterGearType,
  searchCars,
} from "@/utils/searchCars";
import LoadingPosts from "@/components/LoadingPosts";
import { svgFilter } from "@/components/svgsPath";
import FilterCars from "@/components/Cars/FilterCars";

const Cars = () => {
  const t = useTranslations("carsPage");
  const f = useTranslations("filters");
  const [posts, setPosts] = useState<CarPost[]>([]); // Initialize posts as an empty array
  const [searchedCarsPosts, setSearchedCarsPosts] = useState<CarPost[]>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterOn, setFilterOn] = useState(false);
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [carBrand, setCarBrand] = useState<string>("");

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

  const onCarBrandChange = (brand: string) => {
    setCarBrand(brand);
  };

  const onCarTypeChange = (type: string[]) => {
    setCarType(type);
  };

  const onMinPriceChange = (min: string) => {
    setMinPrice(min);
  };
  const onMaxPriceChange = (max: string) => {
    setMaxPrice(max);
  };

  const onMinYearChange = (min: string) => {
    setMinYear(min);
  };
  const onMaxYearChange = (max: string) => {
    setMaxYear(max);
  };

  const onMinDistanceChange = (min: string) => {
    setMinDistance(min);
  };
  const onMaxDistanceChange = (max: string) => {
    setMaxDistance(max);
  };

  const onCarGearChange = (type: string[]) => {
    setGearType(type);
  };

  const onCarFuelChange = (type: string[]) => {
    setFuelType(type);
  };

  const onCountryChange = (country: string) => {
    setSelectedCountry(country);
  };
  const onCityChange = (city: string) => {
    setCity(city);
  };

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("posts")
      .onSnapshot((snapshot) => {
        const newPosts: CarPost[] = []; // Create a new array to hold updated posts
        snapshot.forEach((doc) => {
          newPosts.push({
            postId: doc.id,
            ...doc.data(),
          } as CarPost);
        });
        setPosts(newPosts.filter((post) => post.language === locale)); // Update posts state with the new data
        setSearchedCarsPosts(
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
    setSearchedCarsPosts(searchCars(searchTerm, posts));
  }, [posts, searchTerm]);

  useEffect(() => {
    setSearchedCarsPosts(filterCarBrand(carBrand, posts));
    setFilterOn(true);
  }, [carBrand, posts]);

  useEffect(() => {
    setSearchedCarsPosts(filterCarType(carType, posts));
    setFilterOn(true);
  }, [carType, posts]);

  useEffect(() => {
    setSearchedCarsPosts(filterCarPrice(minPrice, maxPrice, posts));
    setFilterOn(true);
  }, [maxPrice, minPrice, posts]);

  useEffect(() => {
    setSearchedCarsPosts(filterCarYear(minYear, maxYear, posts));
    setFilterOn(true);
  }, [maxYear, minYear, posts]);

  useEffect(() => {
    setSearchedCarsPosts(filterCarDistance(minDistance, maxDistance, posts));
    setFilterOn(true);
  }, [maxDistance, minDistance, posts]);

  useEffect(() => {
    setSearchedCarsPosts(filterGearType(gearType, posts));
    setFilterOn(true);
  }, [gearType, posts]);

  useEffect(() => {
    setSearchedCarsPosts(filterFuelType(fuelType, posts));
    setFilterOn(true);
  }, [fuelType, posts]);

  useEffect(() => {
    setSearchedCarsPosts(filterCarCountry(selectedCountry, posts));
    setFilterOn(true);
  }, [selectedCountry, posts]);

  useEffect(() => {
    setSearchedCarsPosts(filterCarCity(city, posts));
    setFilterOn(true);
  }, [city, posts]);

  if (!searchedCarsPosts) {
    return (
      <div
        className={`flex flex-col w-full h-[700px] pt-10 px-2 md:px-10 lg:px-20`}
      >
        <p className="flex justify-center items-center mb-10 font-bold">
          {t("wantedCars")} {posts.length}
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
        {t("wantedCars")} {searchedCarsPosts.length}
      </p>

      <div className={`flex justify-center`}>
        <SearchInput onSearchTermChange={handleSearchTermChange} />
      </div>

      {searchedCarsPosts.length > 0 || filterOn ? (
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
        {(searchedCarsPosts.length > 0 || filterOn) && (
          <div className={`lg:w-1/3 xl:1/4 hidden lg:block`}>
            <FilterCars
              onCarBrandChange={onCarBrandChange}
              onCarTypeChange={onCarTypeChange}
              onMinPriceChange={onMinPriceChange}
              onMaxPriceChange={onMaxPriceChange}
              onMinYearChange={onMinYearChange}
              onMaxYearChange={onMaxYearChange}
              onMaxDistanceChange={onMaxDistanceChange}
              onMinDistanceChange={onMinDistanceChange}
              onCarGearChange={onCarGearChange}
              onCarFuelChange={onCarFuelChange}
              onCountryChange={onCountryChange}
              onCityChange={onCityChange}
            />
          </div>
        )}

        <div className={`flex flex-col justify-start items-center w-full`}>
          {showFilters ? (
            <div
              className={`flex flex-col justify-between z-10 h-screen w-screen bg-white pb-5 pt-20 absolute top-0 left-0`}
            >
              <FilterCars
                onCarBrandChange={onCarBrandChange}
                onCarTypeChange={onCarTypeChange}
                onMinPriceChange={onMinPriceChange}
                onMaxPriceChange={onMaxPriceChange}
                onMinYearChange={onMinYearChange}
                onMaxYearChange={onMaxYearChange}
                onMaxDistanceChange={onMaxDistanceChange}
                onMinDistanceChange={onMinDistanceChange}
                onCarGearChange={onCarGearChange}
                onCarFuelChange={onCarFuelChange}
                onCountryChange={onCountryChange}
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
              {(searchedCarsPosts.length > 0 || filterOn) && (
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
                {searchedCarsPosts
                  .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
                  .map((post) => (
                    <PostCard
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

export default Cars;
