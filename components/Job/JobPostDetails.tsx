import { JobPost } from "@/types/post";
import { useTranslations } from "next-intl";
import React from "react";
import {
  svgAddress,
  svgDeskWork,
  svgEducation,
  svgJob,
  svgPrice,
} from "../svgsPath";

type Props = {
  post: JobPost;
};

const JobPostDetails = ({ post }: Props) => {
  const t = useTranslations("jobPostCard");

  return (
    <div className={`flex flex-col gap-2 mt-3 overflow-x-auto`}>
      {/* Job type */}
      <p
        className={`btn2 bg-white/50 text-secondary flex flex-row items-center gap-1`}
      >
        <span
          className={`bg-primary/20 h-fit w-fit p-1 rounded-lg border border-primary shadow-Card2`}
        >
          {svgJob}
        </span>{" "}
        {post.jobType[0]} {post.jobType[1] && ` - ${post.jobType[1]}`}
        {post.jobType[2] && ` - ${post.jobType[2]}`}
        {post.jobType[3] && ` - ${post.jobType[3]}`}
        {post.jobType[4] && ` - ${post.jobType[4]}`}
      </p>

      {/* Job location */}
      <p
        className={`btn2 bg-white/50 text-secondary flex flex-row items-center gap-1`}
      >
        <span
          className={`bg-primary/20 h-fit w-fit p-1 rounded-lg border border-primary shadow-Card2`}
        >
          {svgDeskWork}
        </span>{" "}
        {post.jobLocation[0]}{" "}
        {post.jobLocation[1] && ` - ${post.jobLocation[1]}`}
        {post.jobLocation[2] && ` - ${post.jobLocation[2]}`}
      </p>

      {/* Education Level */}
      <p
        className={`btn2 bg-white/50 text-secondary flex flex-row items-center gap-1`}
      >
        <span
          className={`bg-primary/20 h-fit w-fit p-1 rounded-lg border border-primary shadow-Card2`}
        >
          {svgEducation}
        </span>{" "}
        {post.educationLevel[0]}{" "}
        {post.educationLevel[1] && ` - ${post.educationLevel[1]}`}
        {post.educationLevel[2] && ` - ${post.educationLevel[2]}`}
        {post.educationLevel[3] && ` - ${post.educationLevel[3]}`}
        {post.educationLevel[4] && ` - ${post.educationLevel[4]}`}
      </p>

      {/* Salary */}
      <p
        className={`btn2 bg-white/50 text-secondary flex flex-row items-center gap-1`}
      >
        <span
          className={`bg-primary/20 h-fit w-fit p-1 rounded-lg border border-primary shadow-Card2`}
        >
          {svgPrice}
        </span>{" "}
        {post?.salaryRange[0]} - {post?.salaryRange[1]} {t("sar")}
      </p>

      {/* Address */}
      <p
        className={`btn2 bg-white/50 text-secondary flex flex-row items-center gap-1`}
      >
        <span
          className={`bg-primary/20 h-fit w-fit p-1 rounded-lg border border-primary shadow-Card2`}
        >
          {svgAddress}
        </span>{" "}
        {post?.address}
      </p>
    </div>
  );
};

export default JobPostDetails;
