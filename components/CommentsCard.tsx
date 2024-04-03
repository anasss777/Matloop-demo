"use client";

import { CarPost } from "@/types/post";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import {
  svgClose,
  svgCloseDark,
  svgComment,
  svgError,
  svgFile,
  svgImage,
  svgSend,
} from "./svgsPath";
import firebase from "@/firebase";
import { addComment } from "@/utils/post";
import CommentsSection from "./CommentsSection";
import { Comment } from "@/types/comment";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import Popup from "reactjs-popup";
const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

type Props = {
  post: CarPost;
};

const CommentsCard = ({ post }: Props) => {
  const t = useTranslations("postCard");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [showComments, setShowComments] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [commentsImages, setCommentsImages] = useState<FileList | null>(null);
  const [commentsFiles, setCommentsFiles] = useState<FileList | null>(null);
  const [commentor, setCommentor] = useState<any>();
  const [comments, setComments] = useState<Comment[]>();
  const [newComment, setNewComment] = useState(false);
  const [commentUpdated, setCommentUpdated] = useState(false);
  const [openComments, setOpenComments] = useState(false);

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
      addComment(
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
      addComment(
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
    <Popup
      trigger={
        <button className="bg-gray-400 p-1 h-fit w-fit rounded-md mt-5">
          {svgComment}
        </button>
      }
      open={openComments}
      onOpen={() => setOpenComments(!openComments)}
      modal
      nested
      lockScroll
      overlayStyle={{
        background: "#000000cc",
      }}
      contentStyle={{
        width: "90%",
      }}
      onClose={() => handleCommentUpdated(commentUpdated)}
    >
      <div
        className={`max-w-[400px] bg-gray-400 rounded-md p-2 flex flex-col items-center justify-between gap-2 mx-auto h-[90vh] ${
          isArabic && "rtl"
        }`}
      >
        <div className={`flex flex-col justify-center w-full`}>
          <button onClick={() => setOpenComments(!openComments)}>
            {svgCloseDark}
          </button>
        </div>

        {/* show one or all comments */}
        <div className={`h-full w-full`}>
          {showComments ? (
            // Showing all comments
            <div className={`w-full`}>
              <div className={`w-full flex justify-end pl-2 sticky`}>
                <span
                  className={`mb-2 cursor-pointer`}
                  onClick={() => setShowComments(false)}
                >
                  {svgClose}
                </span>
              </div>
              <div className={`overflow-y-auto h-[52vh] lg:h-[58vh] w-full`}>
                {comments &&
                  comments.map(
                    (comment, index) =>
                      comment.commentId && (
                        <CommentsSection
                          commentUpdated={commentUpdated}
                          handleCommentUpdated={handleCommentUpdated}
                          key={index}
                          comment={comment}
                          post={post}
                        />
                      )
                  )}
              </div>
            </div>
          ) : (
            // Showing one comment
            <div className="mt-[38px] w-full">
              {(comments?.length === 0 || comments === undefined) && (
                <p
                  className={`text-gray-200 font-semibold flex justify-center`}
                >
                  {t("noCommentsYet")}
                </p>
              )}
              {comments && comments[0] && (
                <CommentsSection
                  commentUpdated={commentUpdated}
                  handleCommentUpdated={handleCommentUpdated}
                  comment={comments[0]}
                  post={post}
                />
              )}

              {comments && comments.length > 1 && (
                <div
                  className={`flex h-fit w-full justify-center text-white mt-5`}
                >
                  <button
                    onClick={() => setShowComments(!showComments)}
                    className={`bg-teal-500 py-2 px-3 cursor-pointer rounded-md shadow-Card2 hover:bg-teal-600 transition-all duration-300
                    ease-linear`}
                  >
                    {t("seeAllComments")}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Number of images and files and their errors */}
        {commentor && (
          <div className={`flex flex-col gap-2`}>
            {/* Number of images and its error */}
            <div className={`flex flex-col gap-1 text-center`}>
              <p className={`text-white ${!isArabic && "ltr"}`}>
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
            <div className={`flex flex-col gap-1 text-center`}>
              <p className={`text-white ${!isArabic && "ltr"}`}>
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

        {/* Form for a comment */}
        {commentor ? (
          <div className="flex flex-col justify-between">
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
      </div>
    </Popup>
  );
};

export default CommentsCard;
