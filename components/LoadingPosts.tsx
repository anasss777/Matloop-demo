import React from "react";
import { svgLoadingGreen } from "./svgsPath";

const LoadingPosts = () => {
  return (
    <div className={`flex justify-center items-center h-[500px]`}>
      <span className={`slow-spin`}>{svgLoadingGreen}</span>
    </div>
  );
};

export default LoadingPosts;
