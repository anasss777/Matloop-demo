"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import CommentsSection from "./CommentsSection";
import { CarPost } from "@/types/post";
import { useLocale, useTranslations } from "next-intl";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import {
  svgClockBlue,
  svgClose,
  svgDelete,
  svgEdit,
  svgError,
  svgFile,
  svgImage,
  svgSend,
} from "./svgsPath";
import { addComment, deletePost } from "@/utils/post";
import firebase from "@/firebase";
import { Comment } from "@/types/comment";
import TimeAgo from "./TimeAgo";
import Popup from "reactjs-popup";
import EditPost from "./EditPost";
import Swal from "sweetalert2";

const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

type Props = {
  allowImg?: boolean;
  posterName: string;
  posterImage: string;
  post: CarPost;
};

const PostCard = (props: Props) => {
  const [showComments, setShowComments] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [commentsImages, setCommentsImages] = useState<FileList | null>(null);
  const [commentsFiles, setCommentsFiles] = useState<FileList | null>(null);
  const [commentor, setCommentor] = useState<any>();
  const [comments, setComments] = useState<Comment[]>();
  const [canEdit, setCanEdit] = useState(false);
  const [openEditPost, setOpenEditPost] = useState(false);
  const [newComment, setNewComment] = useState(false);
  const t = useTranslations("postCard");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [commentUpdated, setCommentUpdated] = useState(false);

  const handleCommentUpdated = (childValue: boolean) => {
    setCommentUpdated(!childValue);
  };

  useEffect(() => {
    const fetchComments = async () => {
      const commentsIds = props?.post?.comments?.map((comment) => comment.id);
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
  }, [props.post?.comments, props.post.postId, newComment, commentUpdated]);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCanEdit(props.post.poster.userId === user.uid);
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
  }, [props.post.poster.userId]);

  const validateInputs = () => {
    if (commentContent === "" && !commentsImages && !commentsFiles) {
      alert(
        "Comment can't be empty.\nWrite a comment or upload an image/file."
      );
      return;
    }
    if (!commentsImages || !commentsFiles) {
      addComment(
        props.post,
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
        props.post,
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

  const handleDeletePost = () => {
    Swal.fire({
      title: t("sure"),
      text: t("deletePostWarning"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#4682b4",
      cancelButtonText: t("cancel"),
      confirmButtonText: t("yesDelete"),
    }).then((result) => {
      if (result.isConfirmed) {
        deletePost(props.post);
        Swal.fire({
          text: t("postDeleted"),
          icon: "success",
          confirmButtonColor: "#4682b4",
          confirmButtonText: t("ok"),
        });
      }
    });
  };

  return (
    <div className={`flex flex-col w-full h-fit py-5 rtl`}>
      {/* The post section */}
      <div className={`w-full h-fit py-5 px-4 rounded-t-md bg-[#4682b4]/50`}>
        <div className={`flex flex-row justify-between`}>
          <div className="flex flex-row gap-2 items-center justify-start mb-3">
            {props.posterImage ? (
              <Image
                src={props.posterImage}
                alt="Poster profile image"
                height={400}
                width={400}
                className="object-scale-down h-10 w-10 rounded-full shadow-lg"
              />
            ) : (
              <Image
                src="/images/profile.png"
                alt="Poster profile image"
                height={400}
                width={400}
                className="object-scale-down h-10 w-10"
              />
            )}
            <Link
              href={props.post.poster.userId}
              locale={locale}
              className={`ltr font-bold text-secondary ${isArabic && "rtl"}`}
            >
              {props.posterName}
            </Link>
          </div>

          <div
            className={`btn2 bg-white/50 text-secondary flex flex-row gap-1 items-center ${
              !isArabic && "ltr"
            }`}
          >
            <span>{svgClockBlue}</span>{" "}
            <TimeAgo postDate={props.post?.createdAt.toDate()} />
          </div>
        </div>
        <p className="text-xl font-bold mr-4">{props.post?.postTitle}</p>
        <p className="mr-4">{props.post?.description}</p>

        {/* Post Details */}
        <div className={`flex flex-wrap gap-2 mt-3`}>
          <p className={`btn2 bg-white/50 text-secondary flex flex-row`}>
            <span className={`text-primary font-semibold`}>
              {t("carBrand")}
            </span>{" "}
            {props.post?.carBrand}
          </p>
          <p className={`btn2 bg-white/50 text-secondary flex flex-row`}>
            <span className={`text-primary font-semibold`}>{t("carType")}</span>{" "}
            {props.post?.carType[0]}{" "}
            {props.post?.carType[1] && ` - ${props.post?.carType[1]}`}{" "}
            {props.post?.carType[2] && ` - ${props.post?.carType[2]}`}{" "}
            {props.post?.carType[3] && ` - ${props.post?.carType[3]}`}{" "}
            {props.post?.carType[4] && ` - ${props.post?.carType[4]}`}{" "}
          </p>
          <p className={`btn2 bg-white/50 text-secondary flex flex-row`}>
            <span className={`text-primary font-semibold`}>
              {t("priceRange")}
            </span>{" "}
            {props.post?.priceRange[0]} - {props.post?.priceRange[1]}
          </p>
          <p className={`btn2 bg-white/50 text-secondary flex flex-row`}>
            <span className={`text-primary font-semibold`}>
              {t("yearRange")}
            </span>{" "}
            {props.post?.yearRange[0]} - {props.post?.yearRange[1]}
          </p>
          <p className={`btn2 bg-white/50 text-secondary flex flex-row`}>
            <span className={`text-primary font-semibold`}>
              {t("maxDistance")}
            </span>{" "}
            {props.post?.maxDistance}
          </p>
          <p className={`btn2 bg-white/50 text-secondary flex flex-row`}>
            <span className={`text-primary font-semibold`}>
              {t("gearType")}
            </span>{" "}
            {props.post?.gearType[0]}{" "}
            {props.post?.gearType[1] && ` - ${props.post?.gearType[1]}`}
          </p>
          <p className={`btn2 bg-white/50 text-secondary flex flex-row`}>
            <span className={`text-primary font-semibold`}>{t("region")}</span>{" "}
            {props.post?.region}
          </p>
        </div>

        <div className={`flex flex-row gap-2 justify-end`}>
          {/* Delete a post */}
          {canEdit && (
            <div className={`flex justify-end w-fit`}>
              <button
                className="bg-gray-400 p-1 h-fit w-fit rounded-md mt-3"
                onClick={handleDeletePost}
              >
                {svgDelete}
              </button>
            </div>
          )}

          {/* Edit Pop up window */}
          <Popup
            trigger={
              canEdit ? (
                <div className={`flex justify-end w-fit`}>
                  <button className="bg-gray-400 p-1 h-fit w-fit rounded-md mt-3">
                    {svgEdit}
                  </button>
                </div>
              ) : (
                <div></div>
              )
            }
            open={openEditPost}
            onOpen={() => setOpenEditPost(!openEditPost)}
            modal
            nested
            lockScroll
            overlayStyle={{
              background: "#000000cc",
            }}
            contentStyle={{
              width: "90%",
            }}
          >
            <EditPost
              openEditPost={openEditPost}
              setOpenEditPost={setOpenEditPost}
              post={props.post}
            />
          </Popup>
        </div>
      </div>

      {/* Comments section */}
      <div className="w-full bg-gray-400 rounded-b-md py-5 px-3 flex flex-col items-center justify-center">
        {/* Form for a comment */}
        {commentor ? (
          <div className="flex flex-col justify-between">
            <textarea
              rows={4}
              cols={50}
              placeholder={t("commentContent")}
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              className="w-full rounded-t-md outline-1 outline-gray-400 py-2 px-3 text-gray-400 h-28 resize-none"
            ></textarea>

            <div
              className={`flex gap-2 items-center justify-end w-full bg-white p-2 rounded-b-md`}
            >
              {/* Add up to 10 images to a comment */}
              <button className="">
                <label htmlFor={`imageInput${props.post.poster.userId}`}>
                  <span
                    className={`flex bg-gray-200 h-fit w-fit p-1 rounded-full border border-gray-300 shadow-md`}
                  >
                    {svgImage}
                  </span>
                </label>
                <input
                  type="file"
                  id={`imageInput${props.post.poster.userId}`}
                  multiple
                  accept="image/*"
                  className="absolute left-[-9999px]"
                  onChange={(e) => setCommentsImages(e.target.files)}
                />
              </button>

              {/* Add up to 3 files to a comment */}
              <button className="">
                <label htmlFor={`fileInput${props.post.poster.userId}`}>
                  <span
                    className={`flex bg-gray-200 h-fit w-fit p-1 rounded-full border border-gray-300 shadow-md`}
                  >
                    {svgFile}
                  </span>
                </label>
                <input
                  type="file"
                  id={`fileInput${props.post.poster.userId}`}
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

        {/* show two or all comments */}
        {showComments ? (
          <div className={`w-full`}>
            <div className={`w-full flex justify-end pl-2 sticky`}>
              <span className={`mb-2`} onClick={() => setShowComments(false)}>
                {svgClose}
              </span>
            </div>
            <div className={`overflow-y-auto h-96 w-full`}>
              {comments &&
                comments.map(
                  (comment, index) =>
                    comment.commentId && (
                      <CommentsSection
                        commentUpdated={commentUpdated}
                        handleCommentUpdated={handleCommentUpdated}
                        key={index}
                        comment={comment}
                        post={props.post}
                      />
                    )
                )}
            </div>
          </div>
        ) : (
          <div className="mt-10 w-full">
            {comments && comments[0] && (
              <CommentsSection
                commentUpdated={commentUpdated}
                handleCommentUpdated={handleCommentUpdated}
                comment={comments[0]}
                post={props.post}
              />
            )}

            {comments && comments.length > 1 && (
              <div className={`flex h-fit w-full justify-end text-white mt-5`}>
                <button
                  onClick={() => setShowComments(!showComments)}
                  className={`bg-teal-500 py-2 px-3 cursor-pointer hover:bg-teal-600 transition-all duration-300 ease-linear`}
                >
                  {t("seeAllComments")}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
