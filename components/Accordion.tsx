"use client";

import React, { useState } from "react";
import { svgDown, svgTop } from "./svgsPath";

type Props = {
  title: string;
  content: React.JSX.Element;
};

const Accordion = ({ title, content }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <p
        className={`flex flex-row justify-between items-center w-full p-2 border mt-8 text-primary text-base md:text-lg font-bold
          cursor-pointer rounded-md`}
        onClick={() => setOpen(!open)}
      >
        {title}
        {open ? svgTop : svgDown}
      </p>
      <div
        className={`px-3 -mt-5 transition-all duration-300 ease-linear border-x w-[95%] ${
          open ? "h-full block" : "h-0 hidden"
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default Accordion;
