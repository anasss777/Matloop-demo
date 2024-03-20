"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Comment } from "@/types/comment";
import { useLocale, useTranslations } from "next-intl";
import TimeAgo from "./TimeAgo";
import { svgClock, svgEdit, svgMail, svgPhone } from "./svgsPath";
import ImagesSlider from "./ImagesSlider";
import firebase from "@/firebase";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

type Props = {
  comment: Comment;
};

const CommentsSection = ({ comment }: Props) => {
  const t = useTranslations("commentSection");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [canEdit, setCanEdit] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCanEdit(comment?.commentor?.userId === user.uid);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [comment.commentor?.userId]);

  return (
    <div className="mb-5 mx-2">
      <div className="flex flex-col bg-gray-50 h-fit w-full py-2 px-3 rounded-xl">
        {/* Profile phoho and image */}
        <div className=" flex flex-row gap-3 items-center justify-start mb-2">
          {comment.commentor?.profileImageSrc ? (
            <Image
              src={comment.commentor.profileImageSrc}
              alt="Commenter profile Picture"
              height={400}
              width={400}
              className="object-scale-down h-10 w-10 rounded-full shadow-md border"
            />
          ) : (
            <Image
              src="/images/profile.png"
              alt="No profile Picture"
              height={400}
              width={400}
              className="object-scale-down h-10 w-10"
            />
          )}
          {/* Commentor name */}
          <Link
            href={comment.commentor?.userId || "/"}
            locale={locale}
            className={`ltr font-bold text-secondary ${isArabic && "rtl"}`}
          >
            {comment.commentor?.name}
          </Link>

          {/* Contact info */}
          <div className={`flex flex-row gap-1`}>
            <a href={`tel:${comment.commentor?.phoneNumber}`}>
              <span
                className={`flex justify-center items-center bg-secondary/20 h-fit w-fit p-1 rounded-full border border-secondary/50
                shadow-md`}
              >
                {svgPhone}
              </span>
            </a>
            <a href={`mailto:${comment.commentor?.email}`}>
              <span
                className={`flex justify-center items-center bg-secondary/20 h-fit w-fit p-1 rounded-full border border-secondary/50
                shadow-md`}
              >
                {svgMail}
              </span>
            </a>
          </div>
        </div>
        {/* The comment */}
        {showMore ? (
          <p className="mr-4" onClick={() => setShowMore(false)}>
            {comment.content}
          </p>
        ) : comment.content?.length > 100 ? (
          <p className="rtl mr-4" onClick={() => setShowMore(true)}>
            {comment.content.substring(0, 100)}
            <span>
              <span>...</span>
              <span
                className="rtl text-gray-500 underline cursor-pointer h-fit"
                onClick={() => setShowMore(true)}
              >
                {t("showMore")}
              </span>
            </span>
          </p>
        ) : (
          <p className="mr-4 mb-5" onClick={() => setShowMore(false)}>
            {comment.content}
          </p>
        )}

        {/* pdf file */}
        {comment.uploadedFiles && (
          <div
            className={`flex flex-row gap-1 ml-[4px] mr-0  ${
              isArabic && "mr-[4px] ml-0"
            }`}
          >
            {comment.uploadedFiles.map((file, index) => (
              <Link key={index} href={file} target="_blank">
                <div
                  className={`flex flex-row my-2 bg-gray-200 h-fit w-fit py-1 px-2 rounded-lg`}
                >
                  <Image
                    src="/images/document.png"
                    alt="Resume file"
                    height={500}
                    width={500}
                    className="object-scale-down h-5 w-5"
                  />
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Images */}
        {comment.uploadedImages && (
          <ImagesSlider images={comment?.uploadedImages} />
        )}

        {/* Edit button */}
        <div className="flex flex-row justify-between items-start w-full">
          <div
            className={`btn2 bg-gray-200 text-gray-500 flex flex-row items-center gap-1 ${
              !isArabic && "ltr"
            }`}
          >
            <span>{svgClock}</span>{" "}
            <TimeAgo postDate={comment?.createdAt?.toDate()} />
          </div>

          {canEdit && (
            <button className="bg-gray-400 p-1 h-fit w-fit rounded-md mt-1">
              {svgEdit}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
