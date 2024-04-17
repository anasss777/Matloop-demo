"use client";

import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { svgError, svgFile, svgImage, svgSend } from "../svgsPath";
import firebase from "@/firebase";
import { Comment } from "@/types/comment";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { JobPost } from "@/types/post";
import { addJobComment } from "@/utils/jobPost";
import JobCommentSection from "./JobCommentSection";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

type Props = {
  post: JobPost;
};

const JobPostComments = ({ post }: Props) => {
  const t = useTranslations("postCard");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [commentContent, setCommentContent] = useState("");
  const [commentsImages, setCommentsImages] = useState<FileList | null>(null);
  const [commentsFiles, setCommentsFiles] = useState<FileList | null>(null);
  const [commentor, setCommentor] = useState<any>();
  const [comments, setComments] = useState<Comment[]>();
  const [newComment, setNewComment] = useState(false);
  const [commentUpdated, setCommentUpdated] = useState(false);

  const handleCommentUpdated = (childValue: boolean) => {
    setCommentUpdated(!childValue);
  };

  useEffect(() => {
    const fetchComments = async () => {
      const commentsIds = post?.comments?.map((comment) => comment.id);
      const commentsRefs = commentsIds?.map((commentId) =>
        firebase.firestore().doc(`comments/${commentId}`)
      );

      if (commentsRefs) {
        const commentSnaps = await Promise.all(
          commentsRefs.map(async (ref) => await ref.get())
        );

        const commentsData: Comment[] = commentSnaps?.map(
          (commentSnap) => ({ ...commentSnap.data() } as Comment)
        );

        setComments(commentsData);
      }
    };

    fetchComments();
  }, [post?.comments, post.postId, newComment, commentUpdated]);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const docRef = firebase
          .firestore()
          .collection("profiles")
          .doc(user.uid);
        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              setCommentor(doc.data());
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [post.poster.userId]);

  const validateInputs = () => {
    if (commentContent === "" && !commentsImages && !commentsFiles) {
      alert(
        "Comment can't be empty.\nWrite a comment or upload an image/file."
      );
      return;
    }
    if (!commentsImages || !commentsFiles) {
      addJobComment(
        post,
        commentContent,
        commentor,
        commentsImages,
        commentsFiles
      );
      setNewComment(!newComment);
      setCommentContent("");
      setCommentsImages(null);
      setCommentsFiles(null);
    }
    if (
      commentsImages &&
      commentsImages.length <= 10 &&
      commentsFiles &&
      commentsFiles.length <= 3
    ) {
      addJobComment(
        post,
        commentContent,
        commentor,
        commentsImages,
        commentsFiles
      );
      setNewComment(!newComment);
      setCommentContent("");
      setCommentsImages(null);
      setCommentsFiles(null);
    }
  };

  return (
    <div
      className={`w-full rounded-md p-2 flex flex-col items-center justify-between gap-2 mx-auto h-fit ${
        isArabic && "rtl"
      }`}
    >
      {/* show one or all comments */}
      {comments && (
        <div className={`w-full shadow-Card2 p-3 rounded-xl`}>
          {comments.map(
            (comment, index) =>
              comment.commentId && (
                <div key={index}>
                  <JobCommentSection
                    commentUpdated={commentUpdated}
                    handleCommentUpdated={handleCommentUpdated}
                    comment={comment}
                    post={post}
                  />
                  {comments.length - 1 !== index && (
                    <div
                      className={`border-t border-t-secondary/60 my-5 w-full`}
                    ></div>
                  )}
                </div>
              )
          )}
        </div>
      )}

      {/* Add Comment */}
      <div
        className={`flex flex-col justify-center items-center w-full h-fit mt-10`}
      >
        {/* Form for a comment */}
        {commentor ? (
          <div className="flex flex-col justify-between w-full border shadow-Card rounded-md">
            <textarea
              rows={4}
              cols={50}
              placeholder={t("commentContent")}
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              className="w-full rounded-t-md outline-1 outline-gray-400 py-2 px-3 text-gray-400 h-10 resize-none"
            ></textarea>

            <div
              className={`flex gap-2 items-center justify-end w-full bg-white p-2 rounded-b-md`}
            >
              {/* Add up to 10 images to a comment */}
              <button className="">
                <label htmlFor={`imageInput${post.poster.userId}`}>
                  <span
                    className={`flex bg-gray-200 h-fit w-fit p-1 rounded-full border border-gray-300 shadow-md`}
                  >
                    {svgImage}
                  </span>
                </label>
                <input
                  type="file"
                  id={`imageInput${post.poster.userId}`}
                  multiple
                  accept="image/*"
                  className="absolute left-[-9999px]"
                  onChange={(e) => setCommentsImages(e.target.files)}
                />
              </button>

              {/* Add up to 3 files to a comment */}
              <button className="">
                <label htmlFor={`fileInput${post.poster.userId}`}>
                  <span
                    className={`flex bg-gray-200 h-fit w-fit p-1 rounded-full border border-gray-300 shadow-md`}
                  >
                    {svgFile}
                  </span>
                </label>
                <input
                  type="file"
                  id={`fileInput${post.poster.userId}`}
                  multiple
                  accept="application/pdf"
                  className="absolute left-[-9999px]"
                  onChange={(e) => setCommentsFiles(e.target.files)}
                />
              </button>

              {/* Add comment button */}
              <button onClick={validateInputs} className="">
                <span
                  className={`flex justify-center items-center bg-secondary/20 h-fit w-fit p-1 rounded-full border border-secondary/50
                  shadow-md`}
                >
                  {svgSend}
                </span>
              </button>
            </div>
          </div>
        ) : (
          <Link
            href="/sign-up"
            locale={locale}
            className={`btn2 bg-secondary shadow-md`}
          >
            {t("signUp")}
          </Link>
        )}

        {/* Number of images and files and their errors */}
        {commentor && (
          <div className={`flex flex-col gap-2`}>
            {/* Number of images and its error */}
            <div
              className={`flex flex-col gap-1 ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              <p className={`text-gray-500 ${!isArabic && "ltr"}`}>
                {t("uploadedImages")}
                <span className={`font-bold text-gray-600`}>
                  {commentsImages?.length || 0}
                </span>
              </p>
              {commentsImages && commentsImages.length > 10 && (
                <p
                  className={`flex flex-row items-center gap-1 text-[#f00] bg-gray-300 w-fit rounded-md px-1 text-sm shadow-md ${
                    !isArabic && "ltr"
                  }`}
                >
                  <span>{svgError}</span> {t("imagesError")}
                </p>
              )}
            </div>

            {/* Number of files and its error */}
            <div
              className={`flex flex-col gap-1 ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              <p className={`text-gray-500 ${!isArabic && "ltr"}`}>
                {t("uploadedFiles")}
                <span className={`font-bold text-gray-600`}>
                  {commentsFiles?.length || 0}
                </span>
              </p>
              {commentsFiles && commentsFiles.length > 3 && (
                <p
                  className={`flex flex-row items-center gap-1 text-[#f00] bg-gray-300 w-fit rounded-md px-1 text-sm shadow-md ${
                    !isArabic && "ltr"
                  }`}
                >
                  <span>{svgError}</span> {t("filesError")}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobPostComments;
