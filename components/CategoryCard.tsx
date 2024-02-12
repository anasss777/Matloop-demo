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
    <div className="w-full p-3">
      <Link href={pageHref}>
        <button className="w-full h-32 rounded-xl p-[2px] relative overflow-hidden shadow-Card2">
          <Image
            className="rounded-xl object-cover w-full h-full"
            src={imgSrc}
            layout="fill"
            alt={categoryName}
          />
        </button>

        {/* Name under the Image */}
        <p className="font-montserrat text-xl p-1 text-teal-500 border-b border-b-teal-200 border-r border-r-teal-200">
          {categoryName}
        </p>
      </Link>
    </div>
  );
};

export default CategoryCard;
