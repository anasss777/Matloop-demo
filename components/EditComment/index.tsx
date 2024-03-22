"use client";

import { Comment } from "@/types/comment";
import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { svgCloseDark } from "@/components/svgsPath";
import EditCommentText from "./EditCommentText";
import EditCommentFiles from "./EditCommentFiles";
import EditCommentImages from "./EditCommentImages";

type Props = {
  openEditComment: boolean;
  setOpenEditComment: React.Dispatch<React.SetStateAction<boolean>>;
  comment: Comment;
};

const EditComment = ({
  openEditComment,
  setOpenEditComment,
  comment,
}: Props) => {
  const t = useTranslations("postCard");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div
      className={`flex flex-col justify-between items-center gap-1 bg-gray-200 m-5 rounded-lg overflow-y-auto h-[90vh] w-full mx-auto p-2 ${
        isArabic && "rtl"
      }`}
    >
      <div className={`flex flex-col justify-center items-center w-full`}>
        <div className={`flex flex-col justify-center w-full`}>
          <button onClick={() => setOpenEditComment(!openEditComment)}>
            {svgCloseDark}
          </button>
        </div>

        <EditCommentText comment={comment} />

        <div className={`border-t border-gray-300 mt-5 w-[90%] h-1`}></div>

        <EditCommentFiles comment={comment} />

        <div className={`border-t border-gray-300 my-5 w-[90%] h-1`}></div>

        <EditCommentImages comment={comment} />
      </div>
    </div>
  );
};

export default EditComment;
