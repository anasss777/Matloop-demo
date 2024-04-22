"use client";

import SearchInput from "@/components/SearchInput";
import { JobPost } from "@/types/post";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import JobPostCard from "@/components/Job/JobPostCard";
import {
  filterJobCity,
  filterJobCountry,
  filterJobEducation,
  filterJobLocation,
  filterJobSalary,
  filterJobType,
  searchJobs,
} from "@/utils/searchJobs";
import LoadingPosts from "@/components/LoadingPosts";
import FilterJobs from "@/components/Job/FilterJobs";
import { svgFilter } from "@/components/svgsPath";

const Jobs = () => {
  const t = useTranslations("jobsPage");
  const f = useTranslations("filters");
  const [posts, setPosts] = useState<JobPost[]>([]); // Initialize posts as an empty array
  const [searchedJobsPosts, setSearchedJobsPosts] = useState<JobPost[]>();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);
  const [filterOn, setFilterOn] = useState(false);

  const locale = useLocale();
  const isArabic = locale === "ar";

  const [jobType, setJobType] = useState<string[]>([]);

  const [jobLocation, setJobLocation] = useState<string[]>([]);

  const [jobEducation, setJobEducation] = useState<string[]>([]);

  const [minSalary, setMinSalary] = useState("0");
  const [maxSalary, setMaxSalary] = useState("1000000");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [city, setCity] = useState("");

  const onJobTypeChange = (type: string[]) => {
    setJobType(type);
  };

  const onJobLocationChange = (location: string[]) => {
    setJobLocation(location);
  };

  const onJobEducationChange = (education: string[]) => {
    setJobEducation(education);
  };

  const onMinSalaryChange = (minSalary: string) => {
    setMinSalary(minSalary);
  };
  const onMaxSalaryChange = (maxSalary: string) => {
    setMaxSalary(maxSalary);
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
      .collection("jobsPosts")
      .onSnapshot((snapshot) => {
        const newPosts: JobPost[] = []; // Create a new array to hold updated posts
        snapshot.forEach((doc) => {
          newPosts.push({
            postId: doc.id,
            ...doc.data(),
          } as JobPost);
        });
        setPosts(newPosts.filter((post) => post.language === locale)); // Update posts state with the new data
        setSearchedJobsPosts(
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
    setSearchedJobsPosts(searchJobs(searchTerm, posts));
  }, [posts, searchTerm]);

  useEffect(() => {
    setSearchedJobsPosts(filterJobType(jobType, posts));
    setFilterOn(true);
  }, [jobType, posts]);

  useEffect(() => {
    setSearchedJobsPosts(filterJobLocation(jobLocation, posts));
    setFilterOn(true);
  }, [jobLocation, posts]);

  useEffect(() => {
    setSearchedJobsPosts(filterJobEducation(jobEducation, posts));
    setFilterOn(true);
  }, [jobEducation, posts]);

  useEffect(() => {
    setSearchedJobsPosts(filterJobSalary(minSalary, maxSalary, posts));
    setFilterOn(true);
  }, [maxSalary, minSalary, posts]);

  useEffect(() => {
    setSearchedJobsPosts(filterJobCountry(selectedCountry, posts));
    setFilterOn(true);
  }, [selectedCountry, posts]);

  useEffect(() => {
    setSearchedJobsPosts(filterJobCity(city, posts));
    setFilterOn(true);
  }, [city, posts]);

  if (!searchedJobsPosts) {
    return (
      <div
        className={`flex flex-col w-full h-[700px] pt-10 px-2 md:px-10 lg:px-20`}
      >
        <p className="flex justify-center items-center mb-10 font-bold">
          {t("wantedJobs")} {posts.length}
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
        {t("wantedJobs")} {searchedJobsPosts.length}
      </p>

      <div className={`flex justify-center`}>
        <SearchInput onSearchTermChange={handleSearchTermChange} />
      </div>

      {searchedJobsPosts.length > 0 || filterOn ? (
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
        {(searchedJobsPosts.length > 0 || filterOn) && (
          <div className={`lg:w-1/3 xl:1/4 hidden lg:block`}>
            <FilterJobs
              onJobTypeChange={onJobTypeChange}
              onJobLocationChange={onJobLocationChange}
              onJobEducationChange={onJobEducationChange}
              onMinSalaryChange={onMinSalaryChange}
              onMaxSalaryChange={onMaxSalaryChange}
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
              <FilterJobs
                onJobTypeChange={onJobTypeChange}
                onJobLocationChange={onJobLocationChange}
                onJobEducationChange={onJobEducationChange}
                onMinSalaryChange={onMinSalaryChange}
                onMaxSalaryChange={onMaxSalaryChange}
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
              {(searchedJobsPosts.length > 0 || filterOn) && (
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
                {searchedJobsPosts
                  .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
                  .map((post) => (
                    <JobPostCard
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

export default Jobs;
