import PostCard from "@/components/PostCard";
import React from "react";

const Jobs = () => {
  return (
    <div className={`flex flex-col w-full h-fit pb-20 pt-10 px-5`}>
      <p className="flex justify-center items-center mb-10 font-bold">
        يوجد 456 وظيفة
      </p>
      <div
        className={`flex flex-row justify-center items-center mx-auto gap-2 rtl`}
      >
        <input
          type="text"
          id="search"
          name="search"
          placeholder="بحث..."
          className={`flex justify-center mx-auto outline-1 outline-gray-400 rtl border border-gray-600 py-2 px-3 rounded-md w-full`}
        />
        <button
          className={`bg-[#4682b4] h-fit w-fit py-2 px-3 rounded-md text-white hover:bg-[#4682b4]/80 transition duration-300 ease-linear
          cursor-pointer`}
        >
          بحث
        </button>
      </div>
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
};

export default Jobs;
