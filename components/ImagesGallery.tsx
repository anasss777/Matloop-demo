"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";

type Props = {
  images: string[];
};

const ImagesGallery = ({ images }: Props) => {
  const t = useTranslations("commentSection");
  const [expanded, setExpanded] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
    setExpanded(true);
  };

  return (
    <div
      className={`w-full h-full flex flex-row gap-2 py-2 border-x-[20px] border-transparent overflow-x-auto`}
    >
      <div className={`flex flex-row gap-2`}>
        {images.slice(0, 10).map((image, index) => (
          <Image
            key={index}
            src={image}
            width={500}
            height={500}
            alt={`Image ${index + 1}`}
            className={`object-cover h-16 w-16 rounded-md ${
              expanded ? "" : ""
            }`}
            onClick={() => handleImageClick(index)}
          />
        ))}
      </div>

      {expanded && selectedImageIndex !== null && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black z-10 py-3">
          <div
            className={`flex flex-row gap-2 overflow-x-auto invisible-scrollbar border-x-[20px] border-transparent`}
          >
            {images.slice(0, 10).map((image, index) => (
              <Image
                key={index}
                src={image}
                width={500}
                height={500}
                alt={`Image ${index + 1}`}
                className={`object-cover h-16 w-16 rounded-md ${
                  expanded ? "sticky z-50" : ""
                }`}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>

          <div className="relative max-w-screen-lg w-full h-full flex items-center">
            <Image
              src={images[selectedImageIndex]}
              width={1200}
              height={800}
              alt={`Image ${selectedImageIndex + 1}`}
              className="object-cover h-fit w-full flex items-center"
            />
          </div>

          <button
            onClick={() => setExpanded(false)}
            className="bg-white px-3 py-1 rounded-full border"
          >
            {t("closeImage")}
          </button>
        </div>
      )}
    </div>
  );
};

export default ImagesGallery;
