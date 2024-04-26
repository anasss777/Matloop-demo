"use client";

import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import { CarPost, DevicePost, JobPost, RealEstatePost } from "@/types/post";
import firebase from "@/firebase";
import EDPostCard from "./ElectronicDevices/EDPostCard";
import RSPostCard from "./RealEstate/RSPostCard";
import JobPostCard from "./Job/JobPostCard";
import { useLocale, useTranslations } from "next-intl";
import LoadingPosts from "./LoadingPosts";

const LatestDeals = () => {
  const t = useTranslations("latestDeals");
  const locale = useLocale();
  const [carsPosts, setCarsPosts] = useState<CarPost[]>([]);
  const [devicesPosts, setDevicesPosts] = useState<DevicePost[]>([]);
  const [realEstatePosts, setRealEstatePosts] = useState<RealEstatePost[]>([]);
  const [jobPosts, setJobPosts] = useState<JobPost[]>([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("posts")
      .onSnapshot((snapshot) => {
        const newPosts: CarPost[] = []; // Create a new array to hold updated posts
        snapshot.forEach((doc) => {
          const postData = {
            ...doc.data(),
          } as CarPost;
          // Check visibility before adding post to array
          if (postData.visibility === true) {
            newPosts.push(postData);
          }
        });
        setCarsPosts(newPosts.filter((post) => post.language === locale)); // Update posts state with the new data
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, [locale]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("electronicDevices")
      .onSnapshot((snapshot) => {
        const newPosts: DevicePost[] = []; // Create a new array to hold updated posts
        snapshot.forEach((doc) => {
          const postData = {
            ...doc.data(),
          } as DevicePost;
          // Check visibility before adding post to array
          if (postData.visibility === true) {
            newPosts.push(postData);
          }
        });
        setDevicesPosts(newPosts.filter((post) => post.language === locale)); // Update posts state with the new data
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, [locale]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("realEstatePosts")
      .onSnapshot((snapshot) => {
        const newPosts: RealEstatePost[] = []; // Create a new array to hold updated posts
        snapshot.forEach((doc) => {
          const postData = {
            ...doc.data(),
          } as RealEstatePost;
          // Check visibility before adding post to array
          if (postData.visibility === true) {
            newPosts.push(postData);
          }
        });
        setRealEstatePosts(newPosts.filter((post) => post.language === locale)); // Update posts state with the new data
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, [locale]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("jobsPosts")
      .onSnapshot((snapshot) => {
        const newPosts: JobPost[] = []; // Create a new array to hold updated posts
        snapshot.forEach((doc) => {
          const postData = {
            ...doc.data(),
          } as JobPost;
          // Check visibility before adding post to array
          if (postData.visibility === true) {
            newPosts.push(postData);
          }
        });
        setJobPosts(newPosts.filter((post) => post.language === locale)); // Update posts state with the new data
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, [locale]);

  if (
    [...carsPosts, ...devicesPosts, ...realEstatePosts, ...jobPosts].length ===
    0
  ) {
    return (
      <div
        className={`flex flex-col w-full h-[700px] pt-10 px-2 md:px-10 lg:px-20`}
      >
        <h1 className="text-3xl mt-5 font-semibold text-[#4682b4] flex flex-row justify-center mb-10">
          {t("latestDeals")}
        </h1>

        <LoadingPosts />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-fit pb-20 pt-10 px-2">
      <h1 className="text-3xl mt-5 font-semibold text-[#4682b4] flex flex-row justify-center mb-10">
        {t("latestDeals")}
      </h1>
      <div
        className={`flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-start gap-10`}
      >
        {[...carsPosts, ...devicesPosts, ...realEstatePosts, ...jobPosts]
          ?.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds)
          .map((post, index) => (
            <div key={index} className={`w-full`}>
              {post.category === "cars" ? (
                <PostCard
                  posterName={post.poster?.name}
                  post={post as CarPost}
                />
              ) : post.category === "electronicDevices" ? (
                <EDPostCard
                  posterName={post.poster?.name}
                  post={post as DevicePost}
                />
              ) : post.category === "realEstates" ? (
                <RSPostCard
                  posterName={post.poster?.name}
                  post={post as RealEstatePost}
                />
              ) : post.category === "jobs" ? (
                <JobPostCard
                  posterName={post.poster?.name}
                  post={post as JobPost}
                />
              ) : (
                <div></div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default LatestDeals;
