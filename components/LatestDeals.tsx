"use client";

import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import Link from "next/link";
import { CarPost, DevicePost, RealEstatePost } from "@/types/post";
import firebase from "@/firebase";
import EDPostCard from "./ElectronicDevices/EDPostCard";
import RSPostCard from "./RealEstate/RSPostCard";

const LatestDeals = () => {
  const [carsPosts, setCarsPosts] = useState<CarPost[]>([]);
  const [devicesPosts, setDevicesPosts] = useState<DevicePost[]>([]);
  const [realEstatePosts, setRealEstatePosts] = useState<RealEstatePost[]>([]);

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

  return (
    <div className="flex flex-col w-full h-fit pb-20 pt-10">
      <h1 className="text-xl mt-5 font-semibold text-[#4682b4] flex flex-row justify-between">
        أحدث الصفقات
      </h1>
      <div
        className={`flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-start gap-10`}
      >
        {[...carsPosts, ...devicesPosts, ...realEstatePosts]
          ?.sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
          .map((post, index) =>
            post.category === "cars" ? (
              <PostCard
                key={index}
                posterName={post.poster.name}
                posterImage={post.poster.profileImageSrc}
                post={post as CarPost}
              />
            ) : post.category === "electronicDevices" ? (
              <EDPostCard
                key={index}
                posterName={post.poster.name}
                posterImage={post.poster.profileImageSrc}
                post={post as DevicePost}
              />
            ) : (
              <RSPostCard
                key={index}
                posterName={post.poster.name}
                posterImage={post.poster.profileImageSrc}
                post={post as RealEstatePost}
              />
            )
          )}
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
