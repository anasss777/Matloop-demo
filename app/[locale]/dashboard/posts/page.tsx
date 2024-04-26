"use client";

import PostsList from "@/components/Dashboard/PostsList";
import { useLocale } from "next-intl";
import React from "react";

const Posts = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div
      className={`flex flex-col gap-10 w-full h-screen px-10 py-5 overflow-y-auto`}
    >
      <PostsList />
    </div>
  );
};

export default Posts;
