"use client";

import Image from "next/image";
import { DevicePost } from "@/types/post";
import { useLocale, useTranslations } from "next-intl";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { svgAddress, svgClock, svgUser } from "../svgsPath";
import TimeAgo from "../TimeAgo";
import EDPostMenu from "./EDPostMenu";
import EDPostDetails from "./EDPostDetails";
import EDCommentCard from "./EDCommentCard";

export const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

type Props = {
  allowImg?: boolean;
  posterName: string;
  posterImage: string;
  post: DevicePost;
};

const EDPostCard = (props: Props) => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div
      className={`flex flex-col w-full h-fit py-5 ${isArabic ? "rtl" : "ltr"}`}
    >
      {/* The post section */}
      <div
        className={`w-full h-fit md:h-[250px] py-2 px-3 rounded-md bg-secondary/30 border border-secondary flex flex-col justify-between
        shadow-Card2 gap-1`}
      >
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
              <span>{svgUser}</span>
            )}

            {/* Poster name and posting time */}
            <div className={`flex flex-col justify-start`}>
              <Link
                href={props.post.poster?.userId}
                locale={locale}
                className={`ltr font-bold text-secondary ${isArabic && "rtl"}`}
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
          <EDPostMenu post={props.post} />
        </div>

        <Link
          href={`/electronic-devices/${props.post?.postId}`}
          locale={locale}
          className={`flex flex-col justify-center gap-1 h-full`}
        >
          <p className="text-xl font-bold mr-3">{props.post?.postTitle}</p>

          {props.post?.description?.length > 50 ? (
            <p className="rtl mr-3">
              {props.post?.description.substring(0, 50)}
              <span>
                <span>...</span>
                <span className="rtl text-gray-500 underline cursor-pointer h-fit">
                  {isArabic ? "رؤية المزيد" : "Show more"}
                </span>
              </span>
            </p>
          ) : (
            <p className="mr-3 mb-5">{props.post?.description}</p>
          )}
        </Link>

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

        {/* Post Details */}
        {/* <EDPostDetails post={props.post} /> */}

        {/* Comments section */}
        {/* <EDCommentCard post={props.post} /> */}
      </div>
    </div>
  );
};

export default EDPostCard;
