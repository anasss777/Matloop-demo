"use client";

import firebase from "@/firebase";
import { CarPost, DevicePost, JobPost, RealEstatePost } from "@/types/post";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { svgCar, svgDevices, svgJob, svgProperty } from "../svgsPath";
import { searchJobs } from "@/utils/searchJobs";
import { searchCars } from "@/utils/searchCars";
import { searchRealEstate } from "@/utils/searchRealEstate";
import { searchDevices } from "@/utils/searchDevices";
import PostRow from "./PostRow";
import SearchInput from "../SearchInput";

const PostsList = () => {
  const t = useTranslations("postsList");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [searchedCategory, setSearchedCategory] = useState("");

  const [jobsPosts, setJobsPosts] = useState<JobPost[]>([]);
  const [searchedJobsPosts, setSearchedJobsPosts] = useState<JobPost[]>([]);

  const [carsPosts, setCarsPosts] = useState<CarPost[]>([]);
  const [searchedCarsPosts, setSearchedCarsPosts] = useState<CarPost[]>([]);

  const [realEstatesPosts, setRealEstatesPosts] = useState<RealEstatePost[]>(
    []
  );
  const [searchedRealEstatesPosts, setSearchedRealEstatesPosts] = useState<
    RealEstatePost[]
  >([]);

  const [devicesPosts, setDevicesPosts] = useState<DevicePost[]>([]);
  const [searchedDevicesPosts, setSearchedDevicesPosts] = useState<
    DevicePost[]
  >([]);

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSearchedCategory(event.target.value);
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
        setJobsPosts(newPosts);
        setSearchedJobsPosts(newPosts);
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, []);

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
        setCarsPosts(newPosts);
        setSearchedCarsPosts(newPosts);
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("realEstatePosts")
      .onSnapshot((snapshot) => {
        const newPosts: RealEstatePost[] = []; // Create a new array to hold updated posts
        snapshot.forEach((doc) => {
          newPosts.push({
            postId: doc.id,
            ...doc.data(),
          } as RealEstatePost);
        });
        setRealEstatesPosts(newPosts);
        setSearchedRealEstatesPosts(newPosts);
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, []);

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
        setDevicesPosts(newPosts);
        setSearchedDevicesPosts(newPosts);
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, []);

  const handleSearchJobsChange = (term: string) => {
    setSearchedJobsPosts(searchJobs(term, jobsPosts));
  };
  const handleSearchCarsChange = (term: string) => {
    setSearchedCarsPosts(searchCars(term, carsPosts));
  };
  const handleSearchRealEstatesChange = (term: string) => {
    setSearchedRealEstatesPosts(searchRealEstate(term, realEstatesPosts));
  };
  const handleSearchDevicesChange = (term: string) => {
    setSearchedDevicesPosts(searchDevices(term, devicesPosts));
  };
  const handleSearchAll = (term: string) => {
    setSearchedJobsPosts(searchJobs(term, jobsPosts));
    setSearchedCarsPosts(searchCars(term, carsPosts));
    setSearchedRealEstatesPosts(searchRealEstate(term, realEstatesPosts));
    setSearchedDevicesPosts(searchDevices(term, devicesPosts));
  };

  return (
    <div className={`w-full`}>
      {/* Search by category */}
      <div className={`flex flex-row gap-3 justify-center items-center w-full`}>
        <select
          id="selectOption"
          value={searchedCategory}
          onChange={handleCategoryChange}
          className={`btn2 bg-primary`}
        >
          <option value="">{t("all")}</option>
          <option value="jobs">{t("jobs")}</option>
          <option value="cars">{t("cars")}</option>
          <option value="realEstates">{t("realEstates")}</option>
          <option value="devices">{t("devices")}</option>
        </select>

        {searchedCategory === "jobs" ? (
          <SearchInput onSearchTermChange={handleSearchJobsChange} />
        ) : searchedCategory === "cars" ? (
          <SearchInput onSearchTermChange={handleSearchCarsChange} />
        ) : searchedCategory === "realEstates" ? (
          <SearchInput onSearchTermChange={handleSearchRealEstatesChange} />
        ) : searchedCategory === "devices" ? (
          <SearchInput onSearchTermChange={handleSearchDevicesChange} />
        ) : (
          <SearchInput onSearchTermChange={handleSearchAll} />
        )}
      </div>

      <table className={`w-full`}>
        <tbody>
          {/* Heading */}
          <tr
            className={`bg-secondary shadow-Card2 py-2 px-5 rounded-full text-white`}
          >
            <th
              className={`p-2 ${
                isArabic ? "rounded-r-full" : "rounded-l-full"
              }`}
            >
              {t("id")}
            </th>
            <th className={`p-2`}>{t("title")}</th>
            <th className={`p-2`}>{t("category")}</th>
            <th className={`p-2`}>{t("status")}</th>
            <th
              className={`p-2 ${
                isArabic ? "rounded-l-full" : "rounded-r-full"
              }`}
            >
              {t("date")}
            </th>
          </tr>

          {/* Posts */}
          {searchedCategory === "jobs"
            ? searchedJobsPosts
                .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
                .map(({ postId, postTitle, status, createdAt }, index) => (
                  <PostRow
                    key={index}
                    postId={postId}
                    postTitle={postTitle}
                    svgDevices={svgJob}
                    status={status}
                    createdAt={createdAt}
                  />
                ))
            : searchedCategory === "cars"
            ? searchedCarsPosts
                .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
                .map(({ postId, postTitle, status, createdAt }, index) => (
                  <PostRow
                    key={index}
                    postId={postId}
                    postTitle={postTitle}
                    svgDevices={svgCar}
                    status={status}
                    createdAt={createdAt}
                  />
                ))
            : searchedCategory === "realEstates"
            ? searchedRealEstatesPosts
                .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
                .map(({ postId, postTitle, status, createdAt }, index) => (
                  <PostRow
                    key={index}
                    postId={postId}
                    postTitle={postTitle}
                    svgDevices={svgProperty}
                    status={status}
                    createdAt={createdAt}
                  />
                ))
            : searchedCategory === "devices"
            ? searchedDevicesPosts
                .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
                .map(({ postId, postTitle, status, createdAt }, index) => (
                  <PostRow
                    key={index}
                    postId={postId}
                    postTitle={postTitle}
                    svgDevices={svgDevices}
                    status={status}
                    createdAt={createdAt}
                  />
                ))
            : [
                ...searchedJobsPosts,
                ...searchedCarsPosts,
                ...searchedRealEstatesPosts,
                ...searchedDevicesPosts,
              ]
                .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
                .map(
                  ({ postId, postTitle, category, status, createdAt }, index) =>
                    category === "jobs" ? (
                      <PostRow
                        key={index}
                        postId={postId}
                        postTitle={postTitle}
                        svgDevices={svgJob}
                        status={status}
                        createdAt={createdAt}
                      />
                    ) : category === "cars" ? (
                      <PostRow
                        key={index}
                        postId={postId}
                        postTitle={postTitle}
                        svgDevices={svgCar}
                        status={status}
                        createdAt={createdAt}
                      />
                    ) : category === "realEstates" ? (
                      <PostRow
                        key={index}
                        postId={postId}
                        postTitle={postTitle}
                        svgDevices={svgDevices}
                        status={status}
                        createdAt={createdAt}
                      />
                    ) : category === "electronicDevices" ? (
                      <PostRow
                        key={index}
                        postId={postId}
                        postTitle={postTitle}
                        svgDevices={svgProperty}
                        status={status}
                        createdAt={createdAt}
                      />
                    ) : (
                      <div></div>
                    )
                )}
        </tbody>
      </table>
    </div>
  );
};

export default PostsList;
