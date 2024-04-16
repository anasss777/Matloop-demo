import { useLocale } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  categoryName: string;
  imgSrc: string;
  pageHref: string;
};

const CategoryCard = ({ categoryName, imgSrc, pageHref }: Props) => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div className="w-full group">
      <Link href={pageHref}>
        <button
          className={`w-full h-32 rounded-xl p-0.5 relative overflow-hidden shadow-Card2 bg-gradient-to-tl from-primary via-transparent
        to-secondary group-hover:scale-[1.02] transition-all duration-300 ease-linear`}
        >
          <Image
            className="rounded-xl object-cover w-full h-full"
            src={imgSrc}
            // fill
            height={500}
            width={500}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt={categoryName}
            priority
          />
        </button>

        {/* Name under the Image */}
        <p
          className={`font-montserrat text-xl p-1 text-teal-500 border-b border-b-teal-200 ${
            isArabic
              ? "border-r border-r-teal-200 text-right"
              : "border-l border-l-teal-200 text-left"
          }`}
        >
          {categoryName}
        </p>
      </Link>
    </div>
  );
};

export default CategoryCard;
