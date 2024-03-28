"use client";

import { CarPost } from "@/types/post";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

type Props = {
  post: CarPost;
};

const SmallCard = ({ post }: Props) => {
  const locale = useLocale();
  const t = useTranslations("topDeals");
  let postCategory = "";

  if (post.category === "cars") {
    postCategory = t("cars");
  } else if (post.category === "jobs") {
    postCategory = t("jobs");
  } else if (post.category === "realEstates") {
    postCategory = t("realEstates");
  } else if (post.category === "electronics") {
    postCategory = t("electronics");
  }

  return (
    <Link
      href={`/${post.postId}`}
      locale={locale}
      className="w-fit h-12 shadow-Card border rounded-md flex flex-row gap-5 justify-between items-center px-2"
    >
      <div className="flex flex-row items-center gap-1">
        {post?.poster?.profileImageSrc ? (
          <Image
            src={post.poster.profileImageSrc}
            alt="Poster profile image"
            height={512}
            width={512}
            className="object-scale-down h-8 w-8 rounded-full shadow-lg"
          />
        ) : (
          <Image
            src="/images/profile.png"
            alt="Poster profile image"
            height={512}
            width={512}
            className="object-scale-down h-8 w-8"
          />
        )}
        <p className="text-sm mr-1 text-gray-500 font-bold">{post.postTitle}</p>
      </div>

      <div
        className={`h-fit w-fit px-2 py-[2px] rounded-full shadow-md text-white text-sm bg-secondary`}
      >
        {postCategory}
      </div>
    </Link>
  );
};

export default SmallCard;
