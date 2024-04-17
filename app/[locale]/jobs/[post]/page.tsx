"use client";

import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import firebase from "@/firebase";
import Breadcrumbs from "@/components/Breadcrumbs";
import LoadingPosts from "@/components/LoadingPosts";
import Image from "next/image";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { JobPost } from "@/types/post";
import { svgBigUser, svgJob } from "@/components/svgsPath";
import JobPostDetails from "@/components/Job/JobPostDetails";
import JobPostComments from "@/components/Job/JobPostComments";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

type Props = {
  params: { post: string };
};

const Post = ({ params }: Props) => {
  const id = params.post;

  const [post, setPost] = useState<JobPost | null>(null);
  const [loading, setLoading] = useState(true);

  const t = useTranslations("singlePost");
  const locale = useLocale();
  const isArabic = locale === "ar";

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("jobsPosts")
      .onSnapshot((snapshot) => {
        const newPosts: JobPost[] = []; // Create a new array to hold updated posts
        snapshot.forEach((doc) => {
          newPosts.push({
            postId: doc.id,
            ...doc.data(),
          } as JobPost);
        });

        // Set a post based on postId
        const postId = id; // Replace with your postId
        const post = newPosts.find((post) => post.postId === postId);
        if (post) {
          setPost(post);
          setLoading(false);
        }
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, [id]);

  if (loading) {
    return (
      <div
        className={`flex flex-col justify-center items-center pb-20 pt-10 px-2 md:px-10 lg:px-20 ${
          isArabic && "rtl"
        }`}
      >
        <Breadcrumbs
          categorySvg={svgJob}
          categoryName={t("jobs")}
          categoryLink="/jobs"
          postTitle={""}
        />
        <LoadingPosts />
      </div>
    );
  }

  if (!post) {
    return <p>No post found.</p>;
  }

  return (
    <div
      className={`flex flex-col justify-center items-center pb-20 pt-10 px-2 md:px-10 lg:px-20 ${
        isArabic && "rtl"
      }`}
    >
      <Breadcrumbs
        categorySvg={svgJob}
        categoryName={t("jobs")}
        categoryLink="/jobs"
        postTitle={post.postTitle}
      />

      {/* Poster info */}
      <div
        className={`flex flex-row gap-2 w-full h-fit justify-center items-center py-2 mt-10 shadow-Card rounded-md border border-secondary`}
      >
        {post.poster.profileImageSrc ? (
          <Link href={`/${post.poster.userId}`} locale={locale}>
            <Image
              src={post.poster.profileImageSrc}
              alt="Poster profile image"
              height={400}
              width={400}
              className="object-scale-down h-20 w-20 rounded-full shadow-lg"
            />
          </Link>
        ) : (
          <Link href={`/${post.poster.userId}`} locale={locale}>
            <span>{svgBigUser}</span>
          </Link>
        )}

        <p className={`text-secondary font-bold`}>{post.postTitle}</p>
      </div>

      {/* Post details and (description and comment) */}
      <div
        className={`flex md:flex-row flex-col-reverse gap-20 mt-10 justify-between w-full ${
          isArabic ? "rtl" : "ltr"
        }`}
      >
        {/* First half: Description and comments */}
        <div className={`flex flex-col md:w-2/3`}>
          <p className={`text-lg mt-6 min-h-96 ${isArabic ? "mr-4" : "ml-4"}`}>
            {post.description}
          </p>

          <div className={`flex flex-col w-full`}>
            <p className={`text-secondary font-bold text-2xl mb-6`}>
              {t("comments")}
            </p>
            <JobPostComments post={post} />
          </div>
        </div>

        {/* Second half: Post details */}
        <div className={`flex flex-col md:w-1/3`}>
          <div
            className={`shadow-Card2 p-0.5 md:sticky md:top-14 overflow-hidden rounded-3xl bg-gradient-to-tl from-primary via-transparent
          to-secondary`}
          >
            <JobPostDetails post={post} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
