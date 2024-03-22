"use client";

import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import { svgClose } from "./svgsPath";

type Props = {
  images: string[];
};

const ImagesSlider = ({ images }: Props) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const t = useTranslations("commentSection");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <Popup
      trigger={
        <div className={`flex flex-row gap-2 overflow-x-auto px-1 mt-1 mb-5`}>
          {images?.map((image, index) => (
            <Image
              key={index}
              src={image}
              width={500}
              height={500}
              alt={`Image ${index + 1}`}
              className={`object-cover h-16 w-16 rounded-md`}
              onClick={() => setSelectedImageIndex(index)}
            />
          ))}
        </div>
      }
      open={open}
      onOpen={() => setOpen(!open)}
      modal
      nested
      lockScroll
      overlayStyle={{
        background: "#000000cc",
      }}
      contentStyle={{
        width: "90%",
      }}
      closeOnEscape
    >
      <div
        className={`flex flex-col justify-start items-center gap-1 h-[95vh]`}
      >
        <div className={`flex justify-end items-end w-full`}>
          <button onClick={() => setOpen(!open)}>{svgClose}</button>
        </div>

        <div
          className={`flex flex-row gap-2 overflow-x-auto px-1 ${
            isArabic && "rtl"
          }`}
        >
          {images?.map((image, index) => (
            <Image
              key={index}
              src={image}
              width={100}
              height={100}
              alt={`Image ${index + 1}`}
              className={`object-cover h-16 w-16 rounded-md ${
                selectedImageIndex === index && "border"
              }`}
              onClick={() => setSelectedImageIndex(index)}
            />
          ))}
        </div>

        <div className="relative w-full h-fit">
          <Image
            src={images[selectedImageIndex]}
            width={1200}
            height={800}
            alt={`Image ${selectedImageIndex + 1}`}
            className="object-scale-down h-[700px] w-full"
          />
        </div>
      </div>
    </Popup>
  );
};

export default ImagesSlider;
