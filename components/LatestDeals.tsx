"use client";

import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";
import Link from "next/link";
import { CarPost } from "@/types/post";
import firebase from "@/firebase";

const LatestDeals = () => {
  const [posts, setPosts] = useState<CarPost[]>();

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await firebase
        .firestore()
        .collection("carsPosts")
        .get();
      const PostsData: CarPost[] = querySnapshot.docs.map(
        (doc) =>
          ({
            ...doc.data(),
          } as CarPost)
      );
      setPosts(PostsData);
    };

    fetchPosts();
  }, []);
  return (
    <div className="flex flex-col w-full h-fit pb-20 pt-10 px-5">
      <h1 className="text-xl mt-5 font-semibold text-[#4682b4] flex flex-row justify-between">
        أحدث الصفقات
      </h1>
      {posts?.map((post, index) => (
        <PostCard
          key={index}
          posterName={post.poster.name}
          posterImage={post.poster.profileImageSrc}
          post={post}
        />
      ))}

      <Link
        href="/"
        className="bg-[#4682b4] text-white py-2 px-3 rounded-3xl text-center"
      >
        رؤية الكل
      </Link>
    </div>
  );
};

export default LatestDeals;
