"use client";

import React from "react";
import {
  svgAddress,
  svgDevices,
  svgOS,
  svgPrice,
  svgSparkles,
  svgStorage,
} from "../svgsPath";
import { useLocale, useTranslations } from "next-intl";
import { DevicePost } from "@/types/post";

type Props = {
  post: DevicePost;
};

const EDPostDetails = ({ post }: Props) => {
  const t = useTranslations("devicePostCard");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div
      className={`flex flex-col gap-2 p-3 overflow-x-auto bg-[#f9fafb] dark:bg-gray-800 rounded-3xl`}
    >
      {" "}
      {/* Post title */}
      <p
        className={`btn2 bg-white/50 dark:bg-gray-700 dark:font-bold text-secondary flex flex-row items-center gap-1`}
      >
        {" "}
        <span
          className={`bg-primary/20 h-fit w-fit p-1 rounded-lg border border-primary shadow-Card2`}
        >
          {svgDevices}
        </span>
        {`${post.deviceType}/${post.deviceBrand}`}
      </p>
      {/* Price range */}
      <p
        className={`btn2 bg-white/50 dark:bg-gray-700 dark:font-bold text-secondary flex flex-row items-center gap-1`}
      >
        <span
          className={`bg-primary/20 h-fit w-fit p-1 rounded-lg border border-primary shadow-Card2`}
        >
          {svgPrice}
        </span>{" "}
        {post?.priceRange[0]} - {post?.priceRange[1]} {t("sar")}
      </p>
      {/* Device condition */}
      <p
        className={`btn2 bg-white/50 dark:bg-gray-700 dark:font-bold text-secondary flex flex-row items-center justify-between gap-1 w-fit`}
      >
        <span
          className={`bg-primary/20 h-fit w-fit p-1 rounded-lg border border-primary shadow-Card2`}
        >
          {svgSparkles}
        </span>
        {post?.deviceCondition[0]}{" "}
        {post?.deviceCondition[1] && ` - ${post?.deviceCondition[1]}`}{" "}
        {post?.deviceCondition[2] && ` - ${post?.deviceCondition[2]}`}
      </p>
      {/* Device OS */}
      <p
        className={`btn2 bg-white/50 dark:bg-gray-700 dark:font-bold text-secondary flex flex-row items-center gap-1`}
      >
        <span
          className={`bg-primary/20 h-fit w-fit p-1 rounded-lg border border-primary shadow-Card2`}
        >
          {svgOS}
        </span>{" "}
        {post.deviceOS}
      </p>
      {/* Device strorage */}
      <p
        className={`btn2 bg-white/50 dark:bg-gray-700 dark:font-bold text-secondary flex flex-row items-center gap-1`}
      >
        <span
          className={`bg-primary/20 h-fit w-fit p-1 rounded-lg border border-primary shadow-Card2`}
        >
          {svgStorage}
        </span>{" "}
        {post.deviceStorage}
      </p>
      {/* Address */}
      <p
        className={`btn2 bg-white/50 dark:bg-gray-700 dark:font-bold text-secondary flex flex-row items-center gap-1`}
      >
        <span
          className={`bg-primary/20 h-fit w-fit p-1 rounded-lg border border-primary shadow-Card2`}
        >
          {svgAddress}
        </span>{" "}
        {post?.region}
      </p>
    </div>
  );
};

export default EDPostDetails;
