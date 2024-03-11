"use client";

import Image from "next/image";
import React, { useState } from "react";
import CommentsSection from "./CommentsSection";
import Link from "next/link";
import { Profile } from "@/types/profile";
import { CarPost } from "@/types/post";
import { useTranslations } from "next-intl";

type Props = {
  allowImg?: boolean;
  posterName: string;
  posterImage: string;
  post: CarPost;
};

const PostCard = (props: Props) => {
  const [showComments, setShowComments] = useState(false);
  const t = useTranslations("postCard");

  return (
    <div className={`flex flex-col w-full h-fit py-5 rtl`}>
      {/* The post section */}
      <div className={`w-full h-fit py-5 px-4 rounded-t-md bg-[#4682b4]/50`}>
        <div className={`flex flex-row justify-between`}>
          <div className="flex flex-row gap-2 items-center justify-start mb-3">
            {props.posterImage ? (
              <Image
                src={props.posterImage}
                alt="Poster profile image"
                height={400}
                width={400}
                className="object-scale-down h-10 w-10 rounded-full shadow-lg"
              />
            ) : (
              <Image
                src="/images/profile.png"
                alt="Poster profile image"
                height={400}
                width={400}
                className="object-scale-down h-10 w-10"
              />
            )}
            <p className="ltr">{props.posterName}</p>
            <div className="flex flex-row gap-2 items-center">
              <Image
                src="/images/mail.png"
                alt="Mail icon"
                height={300}
                width={300}
                className="object-scale-down h-7 w-7"
              />
              <Image
                src="/images/telephone.png"
                alt="Phone number"
                height={300}
                width={300}
                className="object-scale-down h-7 w-7"
              />
            </div>
          </div>

          <p className={`btn2 bg-white/50 text-secondary`}>
            {props.post?.createdAt.toDate().getDate()}/
            {props.post?.createdAt.toDate().getMonth() + 1}/
            {props.post?.createdAt.toDate().getUTCFullYear()}
          </p>
        </div>
        <p className="text-xl font-bold mr-4">{props.post?.postTitle}</p>
        <p className="mr-4">{props.post?.description}</p>

        <div className={`flex flex-wrap gap-2`}>
          <p className={`btn2 bg-white/50 text-secondary flex flex-row`}>
            <span className={`text-primary font-semibold`}>
              {t("carBrand")}
            </span>{" "}
            {props.post?.carBrand}
          </p>
          <p className={`btn2 bg-white/50 text-secondary flex flex-row`}>
            <span className={`text-primary font-semibold`}>{t("carType")}</span>{" "}
            {props.post?.carType[0]}{" "}
            {props.post?.carType[1] && ` - ${props.post?.carType[1]}`}{" "}
            {props.post?.carType[2] && ` - ${props.post?.carType[2]}`}{" "}
            {props.post?.carType[3] && ` - ${props.post?.carType[3]}`}{" "}
            {props.post?.carType[4] && ` - ${props.post?.carType[4]}`}{" "}
          </p>
          <p className={`btn2 bg-white/50 text-secondary flex flex-row`}>
            <span className={`text-primary font-semibold`}>
              {t("priceRange")}
            </span>{" "}
            {props.post?.priceRange[0]} - {props.post?.priceRange[1]}
          </p>
          <p className={`btn2 bg-white/50 text-secondary flex flex-row`}>
            <span className={`text-primary font-semibold`}>
              {t("yearRange")}
            </span>{" "}
            {props.post?.yearRange[0]} - {props.post?.yearRange[1]}
          </p>
          <p className={`btn2 bg-white/50 text-secondary flex flex-row`}>
            <span className={`text-primary font-semibold`}>
              {t("maxDistance")}
            </span>{" "}
            {props.post?.maxDistance}
          </p>
          <p className={`btn2 bg-white/50 text-secondary flex flex-row`}>
            <span className={`text-primary font-semibold`}>
              {t("gearType")}
            </span>{" "}
            {props.post?.gearType[0]}{" "}
            {props.post?.gearType[1] && ` - ${props.post?.gearType[1]}`}
          </p>
          <p className={`btn2 bg-white/50 text-secondary flex flex-row`}>
            <span className={`text-primary font-semibold`}>{t("region")}</span>{" "}
            {props.post?.region}
          </p>
        </div>
      </div>

      {/* Comments section */}
      <div className="w-full bg-gray-400 rounded-b-md py-5 px-3">
        {/* Add a comment section */}
        <div className="flex flex-col justify-between">
          <textarea
            placeholder="أضف تعليقاً..."
            className="w-full rounded-md outline-1 outline-gray-400 py-2 px-3 relative text-gray-400 h-28"
          ></textarea>
          <div className="relative -top-7 flex gap-2 ml-2 justify-end">
            <Link href="#" className="">
              <Image
                src="/images/camera.png"
                alt={""}
                height={500}
                width={500}
                className="object-scale-down cursor-pointer h-5 w-5 hover:scale-105 transition-all duration-300 ease-linear"
              />
            </Link>
            <Link href="#" className="">
              <Image
                src="/images/link.png"
                alt={""}
                height={500}
                width={500}
                className="object-scale-down cursor-pointer h-5 w-5 hover:scale-105 transition-all duration-300 ease-linear"
              />
            </Link>
            <Link href="#" className="">
              <Image
                src="/images/send.png"
                alt={""}
                height={500}
                width={500}
                className="object-scale-down cursor-pointer h-5 w-5 hover:scale-105 transition-all duration-300 ease-linear"
              />
            </Link>
          </div>
        </div>

        {/* show two or all comments */}
        {showComments ? (
          <div>
            <div className={`w-full flex justify-end pl-2 sticky`}>
              <Image
                src="/images/cancel.png"
                alt="Cancel button"
                height={300}
                width={300}
                onClick={() => setShowComments(false)}
                className={`cursor-pointer object-scale-down h-7 w-7 mb-2`}
              />
            </div>
            <div className={`overflow-y-auto h-96`}>
              <CommentsSection allowImg={props.allowImg} />
              <CommentsSection allowImg={props.allowImg} />
              <CommentsSection allowImg={props.allowImg} />
              <CommentsSection allowImg={props.allowImg} />
              <CommentsSection allowImg={props.allowImg} />
              <CommentsSection allowImg={props.allowImg} />
              <CommentsSection allowImg={props.allowImg} />
              <CommentsSection allowImg={props.allowImg} />
              <CommentsSection allowImg={props.allowImg} />
              <CommentsSection allowImg={props.allowImg} />
              <CommentsSection allowImg={props.allowImg} />
              <CommentsSection allowImg={props.allowImg} />
            </div>
          </div>
        ) : (
          <div className="mt-10">
            <CommentsSection allowImg={props.allowImg} />
            <div className={`flex h-fit w-full justify-end text-white mt-5`}>
              <button
                onClick={() => setShowComments(!showComments)}
                className={`bg-teal-500 py-2 px-3 cursor-pointer hover:bg-teal-600 transition-all duration-300 ease-linear`}
              >
                كل التعليقات
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
