"use client";

import { Span } from "next/dist/trace";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const commentExample =
  "أنا مبرمج محترف. أنا مبرمج محترف. أنا مبرمج محترف. أنا مبرمج محترف. أنا مبرمج محترف. أنا مبرمج محترف. أنا مبرمج محترف. أنا مبرمج محترف. أنا مبرمج محترف. أنا مبرمج محترف. أنا مبرمج محترف. أنا مبرمج محترف. أنا مبرمج محترف. أنا مبرمج محترف. أنا مبرمج محترف. أنا مبرمج محترف. أنا مبرمج محترف. أنا مبرمج محترف. ";

const CommentsSection = () => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="mb-5 ml-4 mr-2">
      {/* Profile phoho and image */}
      <div className=" flex flex-row gap-3 items-center justify-start mb-5">
        <Image
          src="/images/profile.png"
          alt="Commenter profile Picture"
          height={400}
          width={400}
          className="object-scale-down h-10 w-10"
        />
        <p className="ltr">Anas Chammam</p>
      </div>
      <div className="flex flex-col bg-white/50 h-fit w-fit py-2 px-3 mr-4">
        {/* The comment */}
        {showMore ? (
          <p>{commentExample}</p>
        ) : (
          <p className="rtl">
            {commentExample.substring(0, 100)}
            {!showMore && (
              <span>
                <span>...</span>
                <span
                  className="rtl text-gray-500 underline"
                  onClick={() => setShowMore(true)}
                >
                  رؤية المزيد
                </span>
              </span>
            )}
          </p>
        )}

        {/* pdf file */}
        <Link href="#" target="_blank">
          <div className="flex flex-row gap-2 my-2 bg-gray-200 h-fit w-fit py-1 px-2 rounded-lg">
            <Image
              src="/images/document.png"
              alt="Resume file"
              height={500}
              width={500}
              className="object-scale-down h-5 w-5"
            />
            <p>سيرتي الذاتية</p>
          </div>
        </Link>
        {/* Edit button */}
        <div className="flex justify-end w-full">
          <button className="text-gray-50 bg-gray-400 p-1 text-sm h-fit w-fit">
            تعديل
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
