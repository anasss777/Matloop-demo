"use client";

import { CarPost } from "@/types/post";
import { useTranslations } from "next-intl";
import React from "react";
import {
  svgAddress,
  svgCar,
  svgEngine,
  svgGearStick,
  svgMileage,
  svgPrice,
  svgcalendar,
} from "./svgsPath";

type Props = {
  post: CarPost;
};

const PostDetails = (props: Props) => {
  const t = useTranslations("postCard");

  return (
    <div className={`flex flex-col gap-2 mt-3 overflow-x-auto`}>
      {/* Car brand and type */}
      <p
        className={`btn2 bg-white/50 text-secondary flex flex-row items-center justify-between gap-1 w-fit`}
      >
        <span
          className={`bg-primary/20 h-fit w-fit p-1 rounded-lg border border-primary shadow-Card2`}
        >
          {svgCar}
        </span>{" "}
        {props.post?.carBrand}
        {" ("}
        {props.post?.carType[0]}{" "}
        {props.post?.carType[1] && ` - ${props.post?.carType[1]}`}{" "}
        {props.post?.carType[2] && ` - ${props.post?.carType[2]}`}{" "}
        {props.post?.carType[3] && ` - ${props.post?.carType[3]}`}{" "}
        {props.post?.carType[4] && ` - ${props.post?.carType[4]}`}
        {")"}
      </p>

      {/* Car price range */}
      <p
        className={`btn2 bg-white/50 text-secondary flex flex-row items-center gap-1`}
      >
        <span
          className={`bg-primary/20 h-fit w-fit p-1 rounded-lg border border-primary shadow-Card2`}
        >
          {svgPrice}
        </span>{" "}
        {props.post?.priceRange[0]} - {props.post?.priceRange[1]} {t("sar")}
      </p>

      {/* Car year range */}
      <p
        className={`btn2 bg-white/50 text-secondary flex flex-row items-center gap-1`}
      >
        <span
          className={`bg-primary/20 h-fit w-fit p-1 rounded-lg border border-primary shadow-Card2`}
        >
          {svgcalendar}
        </span>{" "}
        {props.post?.yearRange[0]} - {props.post?.yearRange[1]}
      </p>

      {/* Mileage */}
      <p
        className={`btn2 bg-white/50 text-secondary flex flex-row items-center gap-1`}
      >
        <span
          className={`bg-primary/20 h-fit w-fit p-1 rounded-lg border border-primary shadow-Card2`}
        >
          {svgMileage}
        </span>{" "}
        {props.post?.maxDistance} {t("kiloMeter")}
      </p>

      {/* Gear type */}
      <p
        className={`btn2 bg-white/50 text-secondary flex flex-row items-center gap-1`}
      >
        <span
          className={`bg-primary/20 h-fit w-fit p-1 rounded-lg border border-primary shadow-Card2`}
        >
          {svgGearStick}
        </span>{" "}
        {props.post?.gearType[0]}{" "}
        {props.post?.gearType[1] && ` - ${props.post?.gearType[1]}`}
      </p>

      {/* Engine type */}
      <p
        className={`btn2 bg-white/50 text-secondary flex flex-row items-center gap-1`}
      >
        <span
          className={`bg-primary/20 h-fit w-fit p-1 rounded-lg border border-primary shadow-Card2`}
        >
          {svgEngine}
        </span>{" "}
        {props.post?.fuelType[0]}{" "}
        {props.post?.fuelType[1] && ` - ${props.post?.fuelType[1]}`}
        {props.post?.fuelType[2] && ` - ${props.post?.fuelType[2]}`}
        {props.post?.fuelType[3] && ` - ${props.post?.fuelType[3]}`}
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
        {props.post?.region}
      </p>
    </div>
  );
};

export default PostDetails;
