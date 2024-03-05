import PostCard from "@/components/PostCard";
import SearchInput from "@/components/SearchInput";
import React from "react";

const Jobs = () => {
  return (
    <div className={`flex flex-col w-full h-fit pb-20 pt-10 px-5`}>
      <p className="flex justify-center items-center mb-10 font-bold">
        يوجد 456 وظيفة
      </p>
      <SearchInput />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
};

export default Jobs;
