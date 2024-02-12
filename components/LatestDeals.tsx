import React from "react";
import PostCard from "./PostCard";
import Link from "next/link";

const LatestDeals = () => {
  return (
    <div className="flex flex-col w-full h-fit pb-20 pt-10 px-5">
      <h1 className="text-xl mt-5 font-semibold text-[#4682b4] flex flex-row justify-between">
        أحدث الصفقات
      </h1>
      <PostCard />
      <PostCard />
      <PostCard />

      <Link
        href="/"
        className="bg-[#4682b4] text-white py-2 px-3 rounded-3xl text-center"
      >
        رؤية الكل
      </Link>
    </div>
  );
};

export default LatestDeals;
