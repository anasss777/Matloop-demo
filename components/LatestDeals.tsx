"use client";

import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import Link from "next/link";
import { CarPost, DevicePost, JobPost, RealEstatePost } from "@/types/post";
import firebase from "@/firebase";
import EDPostCard from "./ElectronicDevices/EDPostCard";
import RSPostCard from "./RealEstate/RSPostCard";
import JobPostCard from "./Job/JobPostCard";

const LatestDeals = () => {
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
          newPosts.push({
            ...doc.data(),
          } as CarPost);
        });
        setCarsPosts(newPosts); // Update posts state with the new data
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
            ...doc.data(),
          } as DevicePost);
        });
        setDevicesPosts(newPosts); // Update posts state with the new data
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
            ...doc.data(),
          } as RealEstatePost);
        });
        setRealEstatePosts(newPosts); // Update posts state with the new data
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("jobsPosts")
      .onSnapshot((snapshot) => {
        const newPosts: JobPost[] = []; // Create a new array to hold updated posts
        snapshot.forEach((doc) => {
          newPosts.push({
            ...doc.data(),
          } as JobPost);
        });
        setJobPosts(newPosts); // Update posts state with the new data
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col w-full h-fit pb-20 pt-10">
      <h1 className="text-xl mt-5 font-semibold text-[#4682b4] flex flex-row justify-between">
        أحدث الصفقات
      </h1>
      <div
        className={`flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-start gap-10`}
      >
        {[...carsPosts, ...devicesPosts, ...realEstatePosts, ...jobPosts]
          ?.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds)
          .map((post, index) => (
            <div key={index}>
              {post.category === "cars" ? (
                <PostCard
                  posterName={post.poster?.name}
                  posterImage={post.poster?.profileImageSrc}
                  post={post as CarPost}
                />
              ) : post.category === "electronicDevices" ? (
                <EDPostCard
                  posterName={post.poster?.name}
                  posterImage={post.poster?.profileImageSrc}
                  post={post as DevicePost}
                />
              ) : post.category === "realEstates" ? (
                <RSPostCard
                  posterName={post.poster?.name}
                  posterImage={post.poster?.profileImageSrc}
                  post={post as RealEstatePost}
                />
              ) : post.category === "jobs" ? (
                <JobPostCard
                  posterName={post.poster?.name}
                  posterImage={post.poster?.profileImageSrc}
                  post={post as JobPost}
                />
              ) : (
                <div></div>
              )}
            </div>
          ))}
      </div>

      <Link
        href="/"
        className="bg-[#4682b4] text-white py-2 px-3 rounded-3xl text-center btn2 mx-auto"
      >
        رؤية الكل
      </Link>
    </div>
  );
};

export default LatestDeals;
