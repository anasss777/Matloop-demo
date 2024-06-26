"use client";

import Image from "next/image";
import { RealEstatePost } from "@/types/post";
import { useLocale, useTranslations } from "next-intl";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { svgAddress, svgClock, svgTickGreen, svgUser } from "../svgsPath";
import TimeAgo from "../TimeAgo";
import RSPostMenu from "./RSPostMenu";
import RSPostDetails from "./RSPostDetails";
import RSCommentCard from "./RSCommentCard";
import { useEffect, useState } from "react";
import { Profile } from "@/types/profile";
import firebase from "@/firebase";

export const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

type Props = {
  allowImg?: boolean;
  posterName: string;
  post: RealEstatePost;
};

const RSPostCard = (props: Props) => {
  const t = useTranslations("postCard");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const db = firebase.firestore();
    const docRef = db.collection("profiles").doc(props.post.poster.userId);

    const unsubscribe = docRef.onSnapshot(
      (doc) => {
        if (doc.exists) {
          setProfile({
            userId: doc.id,
            ...doc.data(),
          } as Profile);
        } else {
          console.log("No such profile!");
        }
      },
      (error) => {
        console.log("Error getting profile:", error);
      }
    );

    // Cleanup function to unsubscribe from the snapshot listener
    return () => unsubscribe();
  }, [props.post.poster.userId]);

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
            {profile?.profileImageSrc ? (
              <Image
                src={profile?.profileImageSrc}
                alt="Poster profile image"
                height={400}
                width={400}
                className="object-cover h-10 w-10 rounded-full shadow-lg"
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
          <RSPostMenu post={props.post} />
        </div>

        <Link
          href={`/real-estate/${props.post?.postId}`}
          locale={locale}
          className={`flex flex-col justify-start gap-1 h-full items-start`}
        >
          <p
            className={`text-xl font-bold ${
              isArabic ? "rtl mr-1" : "ltr ml-1"
            }`}
          >
            {props.post?.postTitle}
          </p>

          {props.post?.description?.length > 50 ? (
            <p className={`${isArabic ? "rtl mr-3" : "ltr ml-3"}`}>
              {props.post?.description.substring(0, 50)}
              <span>
                <span>...</span>
                <span className="rtl text-gray-500 underline cursor-pointer h-fit">
                  {isArabic ? "رؤية المزيد" : "Show more"}
                </span>
              </span>
            </p>
          ) : (
            <p className={`${isArabic ? "rtl mr-3" : "ltr ml-3"}`}>
              {props.post?.description}
            </p>
          )}
        </Link>

        {/* Address */}
        {props.post.done ? (
          <p
            className={`btn2 bg-white/50 dark:bg-gray-700 text-primary flex flex-row items-center gap-1`}
          >
            <span>{svgTickGreen}</span>
            {t("done2")}
          </p>
        ) : (
          <p
            className={`btn2 bg-white/50 dark:bg-gray-700 text-secondary flex flex-row items-center gap-1`}
          >
            <span
              className={`bg-primary/20 h-fit w-fit p-1 rounded-lg border border-primary shadow-Card2`}
            >
              {svgAddress}
            </span>{" "}
            {props.post?.address}
          </p>
        )}

        {/* Post Details */}
        {/* <RSPostDetails post={props.post} /> */}

        {/* Comments section */}
        {/* <RSCommentCard post={props.post} /> */}
      </div>
    </div>
  );
};

export default RSPostCard;
