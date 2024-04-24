"use client";

import { Comment } from "@/types/comment";
import { useTranslations } from "next-intl";
import React, { useState } from "react";
import firebase from "@/firebase";
import Swal from "sweetalert2";

type Props = {
  comment: Comment;
};

const EditCommentText = ({ comment }: Props) => {
  const t = useTranslations("postCard");
  const [commentContent, setCommentContent] = useState(comment.content);

  const handleEditContent = async (content: string) => {
    let docRefComment = firebase
      .firestore()
      .collection("comments")
      .doc(comment.commentId);

    await docRefComment.update({
      content,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    });

    Swal.fire({
      text: t("textEdited"),
      icon: "success",
      confirmButtonColor: "#4682b4",
      confirmButtonText: t("ok"),
    });
  };

  return (
    <div className={`flex flex-col justify-center items-center w-full px-3`}>
      <textarea
        rows={4}
        cols={50}
        placeholder={t("commentContent")}
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        className="w-full rounded-md focus:outline-offset-1 focus:outline-gray-400 py-2 px-3 text-gray-500 h-28 resize-none my-5 border
        border-gray-300 dark:border-gray-600 dark:focus:outline-gray-700 dark:text-gray-200 "
      ></textarea>

      <button
        className={`btn2 bg-secondary shadow-md`}
        onClick={() => handleEditContent(commentContent)}
      >
        {t("save")}
      </button>
    </div>
  );
};

export default EditCommentText;
