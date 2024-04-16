"use client";

import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useLocale, useTranslations } from "next-intl";
import firebase from "@/firebase";
import { CarPost } from "@/types/post";
import { svgCar } from "@/components/svgsPath";
import Breadcrumbs from "@/components/Breadcrumbs";
import LoadingPosts from "@/components/LoadingPosts";
import Image from "next/image";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import PostDetails from "@/components/PostDetails";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

type Props = {
  params: { post: string };
};

const Post = ({ params }: Props) => {
  const id = params.post;

  const [post, setPost] = useState<CarPost | null>(null);
  const [loading, setLoading] = useState(true);

  const t = useTranslations("singlePost");
  const locale = useLocale();
  const isArabic = locale === "ar";

  useEffect(() => {
    async function fetchPost() {
      if (id && typeof id === "string") {
        const db = firebase.firestore();

        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPost(docSnap.data() as CarPost);
          setLoading(false);
          return; // Exit the loop once the document is found
        }

        // If no document was found in any collection
        console.error("No such document!");
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div
        className={`flex flex-col justify-center items-center pb-20 pt-10 px-2 md:px-10 lg:px-20 ${
          isArabic && "rtl"
        }`}
      >
        <Breadcrumbs
          categorySvg={svgCar}
          categoryName={t("cars")}
          categoryLink="/cars"
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
        categorySvg={svgCar}
        categoryName={t("cars")}
        categoryLink="/cars"
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
              className="object-scale-down h-12 w-12 rounded-full shadow-lg"
            />
          </Link>
        ) : (
          <Link href={`/${post.poster.userId}`} locale={locale}>
            <Image
              src="/images/profile.png"
              alt="Poster profile image"
              height={400}
              width={400}
              className="object-scale-down h-12 w-12"
            />
          </Link>
        )}

        <p className={`text-secondary font-bold`}>{post.postTitle}</p>
      </div>

      {/* Post details and description */}
      <div
        className={`flex md:flex-row flex-col gap-3 mt-10 justify-between w-full ${
          isArabic ? "rtl" : "ltr"
        }`}
      >
        <p className={`text-lg mt-6`}>{post.description}</p>
        <div
          className={`shadow-Card2 p-0.5 relative overflow-hidden rounded-3xl bg-gradient-to-tl from-primary via-transparent
          to-secondary`}
        >
          <PostDetails post={post} />
        </div>
      </div>
    </div>
  );
};

export default Post;
