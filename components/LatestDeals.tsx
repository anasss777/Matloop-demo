"use client";

import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import Link from "next/link";
import { CarPost } from "@/types/post";
import firebase from "@/firebase";

const LatestDeals = () => {
  const [posts, setPosts] = useState<CarPost[]>();

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
        setPosts(newPosts); // Update posts state with the new data
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
        className={`flex flex-col md:grid md:grid-cols-2 xl:grid-cols-3 justify-center items-start gap-10`}
      >
        {posts?.slice(0, 2).map((post, index) => (
          <PostCard
            key={index}
            posterName={post.poster.name}
            posterImage={post.poster.profileImageSrc}
            post={post}
            allowImg
          />
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
