"use client";

import SearchInput from "@/components/SearchInput";
import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import { useLocale, useTranslations } from "next-intl";
import { RealEstatePost } from "@/types/post";
import RSPostCard from "@/components/RealEstate/RSPostCard";
import {
  filterNumberOfRooms,
  filterOwnerShipType,
  filterPropertyType,
  filterRealEstateAge,
  filterRealEstateCity,
  filterRealEstateCountry,
  filterRealEstatePrice,
  filterRentType,
  searchRealEstate,
} from "@/utils/searchRealEstate";
import LoadingPosts from "@/components/LoadingPosts";
import FilterRealEstates from "@/components/RealEstate/FilterRealEstate";
import { svgFilter } from "@/components/svgsPath";

const RealEstate = () => {
  const t = useTranslations("realEstatePage");
  const f = useTranslations("filters");
  const [posts, setPosts] = useState<RealEstatePost[]>([]); // Initialize posts as an empty array
  const [searchedRealEstatesPosts, setSearchedRealEstatesPosts] =
    useState<RealEstatePost[]>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterOn, setFilterOn] = useState(false);

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

  const [minAge, setMinAge] = useState("100");
  const [maxAge, setMaxAge] = useState("100");

  const onPropertyTypeChange = (type: string) => {
    setPropertyType(type);
  };
  const onOwnershipTypeChange = (type: string) => {
    setOwnershipType(type);
  };
  const onRentTypeChange = (type: string) => {
    setRentType(type);
  };
  const onMinPriceChange = (min: string) => {
    setMinPrice(min);
  };
  const onMaxPriceChange = (max: string) => {
    setMaxPrice(max);
  };
  const onRoomsChange = (rooms: string) => {
    setNumberOfRooms(rooms);
  };
  const onMinAgeChange = (min: string) => {
    setMinAge(min);
  };
  const onMaxAgeChange = (max: string) => {
    setMaxAge(max);
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
      .collection("realEstatePosts")
      .onSnapshot((snapshot) => {
        const newPosts: RealEstatePost[] = []; // Create a new array to hold updated posts
        snapshot?.forEach((doc) => {
          newPosts.push({
            postId: doc.id,
            ...doc.data(),
          } as RealEstatePost);
        });

        // Filter posts based on visibility
        const visiblePosts = newPosts?.filter(
          (post) => post.visibility === true && post.done === false
        );

        setPosts(visiblePosts.filter((post) => post.language === locale)); // Update posts state with the new data
        setSearchedRealEstatesPosts(
          visiblePosts.filter((post) => post.language === locale)
        );
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, [locale]);

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    setSearchedRealEstatesPosts(searchRealEstate(searchTerm, posts));
  }, [posts, searchTerm]);

  useEffect(() => {
    setSearchedRealEstatesPosts(filterPropertyType(propertyType, posts));
    setFilterOn(true);
  }, [posts, propertyType]);

  useEffect(() => {
    setSearchedRealEstatesPosts(filterOwnerShipType(ownershipType, posts));
    setFilterOn(true);
  }, [ownershipType, posts]);

  useEffect(() => {
    setSearchedRealEstatesPosts(filterRentType(rentType, posts));
    setFilterOn(true);
  }, [posts, rentType]);

  useEffect(() => {
    setSearchedRealEstatesPosts(
      filterRealEstatePrice(minPrice, maxPrice, posts)
    );
    setFilterOn(true);
  }, [maxPrice, minPrice, posts]);

  useEffect(() => {
    setSearchedRealEstatesPosts(filterNumberOfRooms(numberOfRooms, posts));
    setFilterOn(true);
  }, [numberOfRooms, posts]);

  useEffect(() => {
    setSearchedRealEstatesPosts(filterRealEstateAge(minAge, maxAge, posts));
    setFilterOn(true);
  }, [maxAge, minAge, posts]);

  useEffect(() => {
    setSearchedRealEstatesPosts(
      filterRealEstateCountry(selectedCountry, posts)
    );
    setFilterOn(true);
  }, [selectedCountry, posts]);

  useEffect(() => {
    setSearchedRealEstatesPosts(filterRealEstateCity(city, posts));
    setFilterOn(true);
  }, [city, posts]);

  if (!searchedRealEstatesPosts) {
    return (
      <div
        className={`flex flex-col w-full h-[700px] pt-10 px-2 md:px-10 lg:px-20`}
      >
        <p className="flex justify-center items-center mb-10 font-bold">
          {t("wantedRealEstate")} {posts.length}
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
        {t("wantedRealEstate")} {searchedRealEstatesPosts.length}
      </p>

      <div className={`flex justify-center`}>
        <SearchInput onSearchTermChange={handleSearchTermChange} />
      </div>

      {searchedRealEstatesPosts.length > 0 || filterOn ? (
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
        {(searchedRealEstatesPosts.length > 0 || filterOn) && (
          <div className={`lg:w-1/3 xl:1/4 hidden lg:block`}>
            <FilterRealEstates
              onPropertyTypeChange={onPropertyTypeChange}
              onOwnershipTypeChange={onOwnershipTypeChange}
              onRentTypeChange={onRentTypeChange}
              onMinPriceChange={onMinPriceChange}
              onMaxPriceChange={onMaxPriceChange}
              onRoomsChange={onRoomsChange}
              onMinAgeChange={onMinAgeChange}
              onMaxAgeChange={onMaxAgeChange}
              onCountryChange={onCountryChange}
              onCityChange={onCityChange}
            />
          </div>
        )}

        <div className={`flex flex-col justify-start items-center w-full`}>
          {showFilters ? (
            <div
              className={`flex flex-col justify-between z-10 h-screen w-screen bg-white dark:bg-gray-800 pb-5 pt-20 absolute top-0 left-0`}
            >
              <FilterRealEstates
                onPropertyTypeChange={onPropertyTypeChange}
                onOwnershipTypeChange={onOwnershipTypeChange}
                onRentTypeChange={onRentTypeChange}
                onMinPriceChange={onMinPriceChange}
                onMaxPriceChange={onMaxPriceChange}
                onRoomsChange={onRoomsChange}
                onMinAgeChange={onMinAgeChange}
                onMaxAgeChange={onMaxAgeChange}
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
            <div className={`flex flex-col justify-center w-full`}>
              {(searchedRealEstatesPosts.length > 0 || filterOn) && (
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
                className={`flex flex-col sm:grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 justify-center items-center mx-auto gap-5
                w-full`}
              >
                {searchedRealEstatesPosts
                  .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
                  .map((post) => (
                    <RSPostCard
                      key={post.postId} // Use post id as the key
                      posterName={post.poster.name}
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

export default RealEstate;
