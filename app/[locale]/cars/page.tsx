"use client";

import PostCard from "@/components/PostCard";
import SearchInput from "@/components/SearchInput";
import { CarPost } from "@/types/post";
import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import JustTesting from "@/components/JustTesting";

const Cars = () => {
  const [posts, setPosts] = useState<CarPost[]>([]); // Initialize posts as an empty array

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
        setPosts(newPosts); // Update posts state with the new data
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, []);

  return (
    <div className={`flex flex-col w-full h-fit pb-20 pt-10 px-5`}>
      <p className="flex justify-center items-center mb-10 font-bold">
        السيارات المطلوبة: {posts.length}
      </p>

      <SearchInput />

      {/* <JustTesting /> */}

      {posts.map((post) => (
        <PostCard
          key={post.postId} // Use post id as the key
          posterName={post.poster.name}
          posterImage={post.poster.profileImageSrc}
          post={post}
        />
      ))}
    </div>
  );
};

export default Cars;
