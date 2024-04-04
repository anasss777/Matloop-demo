"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Comment } from "@/types/comment";
import { useLocale, useTranslations } from "next-intl";
import TimeAgo from "../TimeAgo";
import {
  svgClock,
  svgDelete,
  svgEdit,
  svgFile2,
  svgMail,
  svgPhone,
} from "../svgsPath";
import ImagesSlider from "../ImagesSlider";
import firebase from "@/firebase";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import Popup from "reactjs-popup";
import EditComment from "../EditComment";
import { DevicePost, RealEstatePost } from "@/types/post";
import Swal from "sweetalert2";
import { deleteDeviceComment } from "@/utils/devicePost";
import { deleteRealEstateComment } from "@/utils/realEstatePost";

const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

type Props = {
  comment: Comment;
  post: RealEstatePost;
  commentUpdated: boolean;
  handleCommentUpdated: (commentUpdated: boolean) => void;
};

const RSCommentSection = ({
  comment,
  post,
  commentUpdated,
  handleCommentUpdated,
}: Props) => {
  const t = useTranslations("commentSection");
  const p = useTranslations("postCard");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [canEdit, setCanEdit] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [openEditComment, setOpenEditComment] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCanEdit(comment?.commentor?.userId === user.uid);
        setCanDelete(
          comment?.commentor?.userId === user.uid ||
            post?.poster?.userId === user.uid
        );
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [comment?.commentor?.userId, post?.poster?.userId]);

  const handleDeleteComment = () => {
    Swal.fire({
      title: p("sure"),
      text: p("deleteCommentWarning"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#4682b4",
      cancelButtonText: p("cancel"),
      confirmButtonText: p("yesDelete"),
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRealEstateComment(post, comment?.commentId);
        Swal.fire({
          text: p("commentDeleted"),
          icon: "success",
          confirmButtonColor: "#4682b4",
          confirmButtonText: p("ok"),
        });
      }
    });
  };

  return (
    <div className="mb-5 mx-2">
      <div className="flex flex-col bg-gray-50 h-fit w-full py-2 px-3 rounded-xl">
        {/* Profile phoho and image */}
        <div className=" flex flex-row gap-3 items-center justify-start mb-2">
          {comment.commentor?.profileImageSrc ? (
            <Image
              src={comment.commentor.profileImageSrc}
              alt="Commenter profile Picture"
              height={400}
              width={400}
              className="object-scale-down h-10 w-10 rounded-full shadow-md border"
            />
          ) : (
            <Image
              src="/images/profile.png"
              alt="No profile Picture"
              height={400}
              width={400}
              className="object-scale-down h-10 w-10"
            />
          )}
          {/* Commentor name */}
          <Link
            href={comment.commentor?.userId || "/"}
            locale={locale}
            className={`ltr font-bold text-secondary ${isArabic && "rtl"}`}
          >
            {comment.commentor?.name}
          </Link>

          {/* Contact info */}
          <div className={`flex flex-row gap-1`}>
            <a href={`tel:${comment.commentor?.phoneNumber}`}>
              <span
                className={`flex justify-center items-center bg-secondary/20 h-fit w-fit p-1 rounded-full border border-secondary/50
                shadow-md`}
              >
                {svgPhone}
              </span>
            </a>
            <a href={`mailto:${comment.commentor?.email}`}>
              <span
                className={`flex justify-center items-center bg-secondary/20 h-fit w-fit p-1 rounded-full border border-secondary/50
                shadow-md`}
              >
                {svgMail}
              </span>
            </a>
          </div>
        </div>
        {/* The comment */}
        {showMore ? (
          <p className="mr-4" onClick={() => setShowMore(false)}>
            {comment.content}
          </p>
        ) : comment.content?.length > 100 ? (
          <p className="rtl mr-4" onClick={() => setShowMore(true)}>
            {comment.content.substring(0, 100)}
            <span>
              <span>...</span>
              <span
                className="rtl text-gray-500 underline cursor-pointer h-fit"
                onClick={() => setShowMore(true)}
              >
                {t("showMore")}
              </span>
            </span>
          </p>
        ) : (
          <p className="mr-4 mb-5" onClick={() => setShowMore(false)}>
            {comment.content}
          </p>
        )}

        {/* pdf file */}
        {comment.uploadedFiles && (
          <div
            className={`flex flex-row gap-1 ml-[4px] mr-0  ${
              isArabic && "mr-[4px] ml-0"
            }`}
          >
            {comment.uploadedFiles.map((file, index) => (
              <Link key={index} href={file} target="_blank">
                <div
                  className={`flex flex-row my-2 bg-gray-200 h-fit w-fit py-1 px-2 rounded-lg shadow-md border border-gray-300`}
                >
                  {svgFile2}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Images */}
        {comment.uploadedImages && (
          <ImagesSlider images={comment?.uploadedImages} />
        )}

        {/* Edit button and time ago */}
        <div className="flex flex-row justify-between items-start w-full">
          <div
            className={`btn2 bg-gray-200 text-gray-500 flex flex-row items-center gap-1 ${
              !isArabic && "ltr"
            }`}
          >
            <span>{svgClock}</span>{" "}
            <TimeAgo postDate={comment?.createdAt?.toDate()} />
          </div>

          <div className={`flex flex-row gap-2 justify-center items-center`}>
            {canDelete && (
              <button
                className={`bg-gray-400 p-1 h-fit w-fit rounded-md mt-1`}
                onClick={handleDeleteComment}
              >
                {" "}
                <span>{svgDelete}</span>{" "}
              </button>
            )}

            {canEdit && (
              <Popup
                trigger={
                  <button className="bg-gray-400 p-1 h-fit w-fit rounded-md mt-1">
                    {svgEdit}
                  </button>
                }
                open={openEditComment}
                onOpen={() => setOpenEditComment(!openEditComment)}
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
                <EditComment
                  openEditComment={openEditComment}
                  setOpenEditComment={setOpenEditComment}
                  comment={comment}
                />
              </Popup>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RSCommentSection;
