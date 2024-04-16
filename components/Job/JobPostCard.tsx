"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { JobPost } from "@/types/post";
import { svgClock } from "../svgsPath";
import TimeAgo from "../TimeAgo";
import JobPostMenu from "./JobPostMenu";
import JobPostDetails from "./JobPostDetails";
import JobCommentCard from "./JobCommentCard";

export const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

type Props = {
  allowImg?: boolean;
  posterName: string;
  posterImage: string;
  post: JobPost;
};

const JobPostCard = (props: Props) => {
  const [showMore, setShowMore] = useState(false);

  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div
      className={`flex flex-col w-full h-fit py-5 ${isArabic ? "rtl" : "ltr"}`}
    >
      {/* The post section */}
      <div
        className={`w-full h-fit md:h-[500px] py-2 px-4 rounded-md bg-secondary/30 border border-secondary flex flex-col justify-between
        shadow-Card2`}
      >
        <div className={`flex flex-col justify-start items-start`}>
          <div className={`flex flex-row justify-between w-full`}>
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

              {/* Poster name and posting time */}
              <div className={`flex flex-col justify-start`}>
                <Link
                  href={props.post.poster?.userId}
                  locale={locale}
                  className={`ltr font-bold text-secondary ${
                    isArabic && "rtl"
                  }`}
                >
                  {props.posterName}
                </Link>
                <div className={`flex flex-row items-center gap-1`}>
                  <span>{svgClock}</span>
                  <TimeAgo
                    postDate={props.post?.createdAt?.toDate()}
                    textSize="10px"
                    textcolor="#6b7280"
                  />
                </div>
              </div>
            </div>

            {/* Edit and delete menu */}
            <JobPostMenu post={props.post} />
          </div>
          <p className="text-xl font-bold mr-4">{props.post?.postTitle}</p>

          {showMore ? (
            <p className="mr-4" onClick={() => setShowMore(false)}>
              {props.post?.description}
            </p>
          ) : props.post?.description?.length > 70 ? (
            <p className="rtl mr-4" onClick={() => setShowMore(true)}>
              {props.post?.description.substring(0, 70)}
              <span>
                <span>...</span>
                <span
                  className="rtl text-gray-500 underline cursor-pointer h-fit"
                  onClick={() => setShowMore(true)}
                >
                  {isArabic ? "رؤية المزيد" : "Show more"}
                </span>
              </span>
            </p>
          ) : (
            <p className="mr-4 mb-5" onClick={() => setShowMore(false)}>
              {props.post?.description}
            </p>
          )}
        </div>

        {/* Post Details */}
        <JobPostDetails post={props.post} />

        {/* Comments section */}
        <JobCommentCard post={props.post} />
      </div>
    </div>
  );
};

export default JobPostCard;
