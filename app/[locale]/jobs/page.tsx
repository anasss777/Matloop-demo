"use client";

import PostCard from "@/components/PostCard";
import SearchInput from "@/components/SearchInput";
import { JobPost } from "@/types/post";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import JobPostCard from "@/components/Job/JobPostCard";
import searchJobs from "@/utils/searchJobs";
import LoadingPosts from "@/components/LoadingPosts";

const Jobs = () => {
  const t = useTranslations("jobsPage");
  const [posts, setPosts] = useState<JobPost[]>([]); // Initialize posts as an empty array
  const [searchedJobsPosts, setSearchedJobsPosts] = useState<JobPost[]>();
  const [searchTerm, setSearchTerm] = useState<string>("");

  const locale = useLocale();
  const isArabic = locale === "ar";

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
        setPosts(newPosts); // Update posts state with the new data
        setSearchedJobsPosts(newPosts);
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, []);

  const handleSearchTermChange = (term: string) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    setSearchedJobsPosts(searchJobs(searchTerm, posts));
  }, [posts, searchTerm]);

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
        {t("wantedJobs")} {posts.length}
      </p>

      <div className={`flex justify-center`}>
        <SearchInput onSearchTermChange={handleSearchTermChange} />
      </div>

      {searchedJobsPosts.length > 0 ? (
        searchTerm.length > 0 ? (
          <div className={`flex flex-row justify-center items-start w-full`}>
            <span className={`font-medium text-primary`}>{t("result")}</span>{" "}
            <span className={`font-bold text-secondary`}>{searchTerm}</span>
          </div>
        ) : (
          <div className={`w-full h-6`}></div>
        )
      ) : searchTerm.length > 0 ? (
        <div
          className={`flex flex-row justify-center items-start h-[564px] w-full`}
        >
          <span className={`font-medium text-primary`}>{t("noResult")}</span>{" "}
          <span className={`font-bold text-secondary`}>{searchTerm}</span>
        </div>
      ) : (
        <LoadingPosts />
      )}
      <div
        className={`flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-start gap-10`}
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
  );
};

export default Jobs;
