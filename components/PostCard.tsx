"use client";

import Image from "next/image";
import React from "react";
import { CarPost } from "@/types/post";
import { useLocale, useTranslations } from "next-intl";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { svgClock } from "./svgsPath";
import TimeAgo from "./TimeAgo";
import PostDetails from "./PostDetails";
import PostMenu from "./PostMenu";
import CommentsCard from "./CommentsCard";

const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

type Props = {
  allowImg?: boolean;
  posterName: string;
  posterImage: string;
  post: CarPost;
};

const PostCard = (props: Props) => {
  const t = useTranslations("postCard");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div className={`flex flex-col w-full h-fit py-5 rtl`}>
      {/* The post section */}
      <div
        className={`w-full h-fit md:h-[500px] py-2 px-4 rounded-md bg-secondary/30 border border-secondary flex flex-col justify-between
        shadow-Card2`}
      >
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

            {/* Poster name and posting time */}
            <div className={`flex flex-col justify-start`}>
              <Link
                href={props.post.poster.userId}
                locale={locale}
                className={`ltr font-bold text-secondary ${isArabic && "rtl"}`}
              >
                {props.posterName}
              </Link>
              <div className={`flex flex-row items-center gap-1`}>
                <span>{svgClock}</span>
                <TimeAgo
                  postDate={props.post?.createdAt.toDate()}
                  textSize="10px"
                  textcolor="#6b7280"
                />
              </div>
            </div>
          </div>

          {/* Edit and delete menu */}
          <PostMenu post={props.post} />
        </div>
        <p className="text-xl font-bold mr-4">{props.post?.postTitle}</p>
        <p className="mr-4">{props.post?.description}</p>

        {/* Post Details */}
        <PostDetails post={props.post} />

        {/* Comments section */}
        <CommentsCard post={props.post} />
      </div>
    </div>
  );
};

export default PostCard;
