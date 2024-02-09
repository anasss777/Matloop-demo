import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  categoryName: string;
  imgSrc: string;
  pageHref: string;
};

const CategoryCard = ({ categoryName, imgSrc, pageHref }: Props) => {
  return (
    <div className={`relative w-full h-fit py-20 px-60 bg-[#FAF9F6]`}>
      {/* Image component */}
      <div className="relative group">
        <Link href={pageHref}>
          <Image
            src={imgSrc}
            alt="Category listing banner"
            height={800}
            width={800}
            className={`flex justify-center mx-auto rounded-3xl shadow-lg grayscale-[30%] blur-[2px] w-full`}
          />

          {/* Text on top of the image */}
          <h1
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-7xl font-bold text-white bg-[#4682b4]
            h-fit w-fit py-5 px-3 rounded-3xl group-hover:scale-105 transition-all duration-300 ease-linear"
          >
            {categoryName}
          </h1>
        </Link>
      </div>
    </div>
  );
};

export default CategoryCard;
