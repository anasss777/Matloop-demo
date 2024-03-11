"use client";

import PostCard from "@/components/PostCard";
import SearchInput from "@/components/SearchInput";
import { CarPost } from "@/types/post";
import React, { useEffect, useState } from "react";
import firebase from "@/firebase";

const Cars = () => {
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
    <div className={`flex flex-col w-full h-fit pb-20 pt-10 px-5`}>
      <p className="flex justify-center items-center mb-10 font-bold">
        السيارات المطلوبة: {posts?.length}
      </p>
      <SearchInput />

      {posts?.map((post, index) => (
        <PostCard
          key={index}
          posterName={post.poster.name}
          posterImage={post.poster.profileImageSrc}
          post={post}
        />
      ))}
    </div>
  );
};

export default Cars;
