"use client";

import SearchInput from "@/components/SearchInput";
import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import { useLocale } from "next-intl";
import { RealEstatePost } from "@/types/post";
import RSPostCard from "@/components/RealEstate/RSPostCard";

const RealEstate = () => {
  const [posts, setPosts] = useState<RealEstatePost[]>([]); // Initialize posts as an empty array
  const locale = useLocale();
  const isArabic = locale === "ar";

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
        setPosts(newPosts); // Update posts state with the new data
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div
      className={`flex flex-col w-full h-fit pb-20 pt-10 px-2 md:px-10 lg:px-20 ${
        isArabic && "rtl"
      }`}
    >
      <p className="flex justify-center items-center mb-10 font-bold">
        العقارات المطلوبة: {posts.length}
      </p>

      <div className={`flex justify-center`}>
        <SearchInput />
      </div>

      <div
        className={`flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-start gap-10`}
      >
        {posts
          .sort((a, b) => b.createdAt.seconds - a.createdAt.seconds)
          .map((post) => (
            <RSPostCard
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

export default RealEstate;
