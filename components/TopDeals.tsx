"use client";

import React, { useEffect, useState } from "react";
import SmallCard from "./SmallCard";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useLocale } from "next-intl";
import { CarPost } from "@/types/post";
import firebase from "@/firebase";

const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const TopDeals = () => {
  const locale = useLocale();
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
    <div className="px-5 flex flex-col">
      <h1 className="text-xl mt-20 font-semibold text-[#4682b4] flex flex-row justify-between">
        <span>أهم الطلبات</span>{" "}
        <Link
          locale={locale}
          href="/"
          className="text-sm text-gray-400 font-normal underline"
        >
          رؤية المزيد
        </Link>
      </h1>
      <div className="flex flex-row gap-2 py-2 h-20 w-full overflow-x-auto">
        {posts?.map((post, index) => (
          <SmallCard key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default TopDeals;
