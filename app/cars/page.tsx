import PostCard from "@/components/PostCard";
import SearchInput from "@/components/SearchInput";
import React from "react";

const page = () => {
  return (
    <div className={`flex flex-col w-full h-fit pb-20 pt-10 px-5`}>
      <p className="flex justify-center items-center mb-10 font-bold">
        يوجد 14564 سيارة
      </p>
      <SearchInput />
      <PostCard allowImg />
      <PostCard allowImg />
      <PostCard allowImg />
      <PostCard allowImg />
      <PostCard allowImg />
    </div>
  );
};

export default page;
