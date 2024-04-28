"use client";

import React, { useEffect, useState } from "react";
import { DevicePost } from "@/types/post";
import firebase from "@/firebase";
import EDPostCard from "../ElectronicDevices/EDPostCard";
import { useLocale, useTranslations } from "next-intl";
import LoadingPosts from "../LoadingPosts";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
export const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const DevicesDeals = () => {
  const t = useTranslations("latestDeals");
  const [devicesPosts, setDevicesPosts] = useState<DevicePost[]>([]);
  const locale = useLocale();

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
          if (postData.visibility === true && postData.done === false) {
            newPosts.push(postData);
          }
        });
        setDevicesPosts(newPosts.filter((post) => post.language === locale)); // Update posts state with the new data
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, [locale]);

  if (devicesPosts.length === 0) {
    return (
      <div
        className={`flex flex-col w-full h-[700px] pt-10 px-2 md:px-10 lg:px-20`}
      >
        <h1 className="text-3xl mt-5 font-semibold text-[#4682b4] flex flex-row justify-center mb-10">
          {t("devicesDeals")}
        </h1>

        <LoadingPosts />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-fit pb-20 pt-10 px-2">
      <h1 className="text-3xl mt-5 font-semibold text-[#4682b4] flex flex-row justify-center mb-10">
        {t("devicesDeals")}
      </h1>
      <div
        className={`flex flex-col md:grid md:grid-cols-2 xl:grid-cols-4 justify-center items-start gap-10`}
      >
        {devicesPosts
          ?.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds)
          .slice(0, 4)
          .map((post, index) => (
            <EDPostCard
              key={index}
              posterName={post.poster?.name}
              post={post}
            />
          ))}
      </div>

      {devicesPosts.length > 4 && (
        <Link
          href="/electronic-devices"
          locale={locale}
          className={`btn2 bg-secondary text-lg flex justify-center items-center mx-auto`}
        >
          {t("showMore")}
        </Link>
      )}
    </div>
  );
};

export default DevicesDeals;
