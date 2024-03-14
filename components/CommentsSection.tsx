"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import ImagesGallery from "./ImagesGallery";
import { Comment } from "@/types/comment";
import { useLocale, useTranslations } from "next-intl";
import TimeAgo from "./TimeAgo";
import { svgClock } from "./svgsPath";

type Props = {
  comment: Comment;
};

const CommentsSection = ({ comment }: Props) => {
  const t = useTranslations("commentSection");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [showMore, setShowMore] = useState(false);

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
          <p className="rtl font-bold">{comment.commentor?.name}</p>
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
          <div className={`flex flex-row`}>
            {comment.uploadedFiles.map((file, index) => (
              <Link key={index} href={file} target="_blank">
                <div className="flex flex-row gap-2 my-2 mr-4 bg-gray-200 h-fit w-fit py-1 px-2 rounded-lg">
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
          <ImagesGallery images={comment?.uploadedImages} />
        )}

        {/* Edit button */}
        <div className="flex flex-row justify-between w-full">
          <div
            className={`btn2 bg-gray-200 text-gray-500 flex flex-row items-center gap-1 ${
              !isArabic && "ltr"
            }`}
          >
            <span>{svgClock}</span>{" "}
            <TimeAgo postDate={comment?.createdAt.toDate()} />
          </div>
          <button className="text-gray-50 bg-gray-400 p-1 text-sm h-fit w-fit rounded-md">
            {t("edit")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
