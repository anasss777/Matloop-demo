"use client";

import Image from "next/image";
import React, { useState } from "react";
import CommentsSection from "./CommentsSection";
import Link from "next/link";

const PostCard = () => {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className={`flex flex-col w-full h-fit py-5 rtl`}>
      {/* The post section */}
      <div className={`w-full h-fit py-5 px-4 rounded-t-md bg-[#4682b4]/50`}>
        <div className="flex flex-row gap-2 items-center justify-start mb-3">
          <Image
            src="/images/profile.png"
            alt="Poster profile image"
            height={400}
            width={400}
            className="object-scale-down h-10 w-10"
          />
          <p className="ltr">Applai Tech.</p>
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
        <p className="text-xl font-bold mr-4">
          مطلوب مبرمج محترف للعمل في إسطنبول
        </p>
        <p className="mr-4">
          مطلوب مبرمج محترف للعمل في إسطنبول. مطلوب مبرمج محترف للعمل في
          إسطنبول. مطلوب مبرمج محترف للعمل في إسطنبول. مطلوب مبرمج محترف للعمل
          في إسطنبول. مطلوب مبرمج محترف للعمل في إسطنبول. مطلوب مبرمج محترف
          للعمل في إسطنبول. مطلوب مبرمج محترف للعمل في إسطنبول. مطلوب مبرمج
          محترف للعمل في إسطنبول. مطلوب مبرمج محترف للعمل في إسطنبول.
        </p>
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
              <CommentsSection />
              <CommentsSection />
              <CommentsSection />
              <CommentsSection />
              <CommentsSection />
              <CommentsSection />
              <CommentsSection />
              <CommentsSection />
              <CommentsSection />
              <CommentsSection />
              <CommentsSection />
              <CommentsSection />
            </div>
          </div>
        ) : (
          <div className="mt-10">
            <CommentsSection />
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
