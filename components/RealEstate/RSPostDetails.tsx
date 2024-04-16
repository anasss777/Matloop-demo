"use client";

import React from "react";
import { svgAddress, svgPrice, svgProperty } from "../svgsPath";
import { useLocale, useTranslations } from "next-intl";
import { RealEstatePost } from "@/types/post";

type Props = {
  post: RealEstatePost;
};

const RSPostDetails = ({ post }: Props) => {
  const t = useTranslations("realEstatePostCard");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div
      className={`flex flex-col gap-2 p-3 overflow-x-auto bg-[#f9fafb] rounded-3xl`}
    >
      {/* Property and ownership Type */}
      <p
        className={`btn2 bg-white/50 text-secondary flex flex-row items-center gap-1`}
      >
        {" "}
        <span
          className={`bg-primary/20 h-fit w-fit p-1 rounded-lg border border-primary shadow-Card2`}
        >
          {svgProperty}
        </span>
        {`${post.propertyType}/${post.ownershipType} ${
          post.ownershipType === "إيجار" || post.ownershipType === "rent"
            ? `(${post.rentType})`
            : ""
        }`}
      </p>

      {/* Price */}
      <p
        className={`btn2 bg-white/50 text-secondary flex flex-row items-center gap-1`}
      >
        <span
          className={`bg-primary/20 h-fit w-fit p-1 rounded-lg border border-primary shadow-Card2`}
        >
          {svgPrice}
        </span>{" "}
        {post?.priceRange[0]} - {post?.priceRange[1]} {t("sar")}
      </p>

      {/* Number of Rooms */}
      <p
        className={`btn2 bg-white/50 text-secondary flex flex-row items-center justify-between gap-1 w-fit`}
      >
        <span
          className={`bg-primary/20 h-fit w-fit p-1 rounded-lg border border-primary shadow-Card2 text-primary font-medium`}
        >
          {t("rooms")}
        </span>
        {post?.numberOfRooms}
      </p>

      {/* Property age */}
      <p
        className={`btn2 bg-white/50 text-secondary flex flex-row items-center gap-1`}
      >
        <span
          className={`bg-primary/20 h-fit w-fit p-1 rounded-lg border border-primary shadow-Card2 text-primary font-medium`}
        >
          {t("propertyAge")}
        </span>{" "}
        {`${post.ageRange[0]} - ${post.ageRange[1]} ${t("years")}`}
      </p>

      {/* Address */}
      <p
        className={`btn2 bg-white/50 text-secondary flex flex-row items-center gap-1`}
      >
        <span
          className={`bg-primary/20 h-fit w-fit p-1 rounded-lg border border-primary shadow-Card2`}
        >
          {svgAddress}
        </span>{" "}
        {post?.address}
      </p>
    </div>
  );
};

export default RSPostDetails;
