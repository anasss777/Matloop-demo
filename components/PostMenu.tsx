"use client";

import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { svgDeleteBlue, svgEditBlue, svgMenu } from "./svgsPath";
import Popup from "reactjs-popup";
import firebase from "@/firebase";
import { CarPost } from "@/types/post";
import Swal from "sweetalert2";
import { deletePost } from "@/utils/post";
import EditPost from "./EditPost";

type Props = {
  post: CarPost;
};

const PostMenu = ({ post }: Props) => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("postCard");
  const [canEdit, setCanEdit] = useState(false);
  const [openEditPost, setOpenEditPost] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCanEdit(post.poster.userId === user.uid);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [post.poster.userId]);

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
        deletePost(post);
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
    <div className="justify-end flex">
      <div
        className={`group relative block hover:contrast-[110%] contrast-[95%] py-1 ${
          locale === "ar" && "rtl"
        }`}
      >
        {canEdit && svgMenu}
        <div
          className={`border border-secondary w-fit rounded-md bg-[#cfdfeb] p-1 transition-[top] duration-300 group-hover:opacity-100
          invisible absolute top-[20%] block opacity-0 shadow-lg group-hover:visible group-hover:top-[50%] ${
            isArabic ? "left-0" : "right-0"
          }`}
        >
          {/* Delete a post */}
          {canEdit && (
            <div
              className={`flex justify-start mb-1 w-full hover:bg-white/50 p-1 rounded-md`}
            >
              <button
                className="h-fit w-fit text-secondary flex flex-row items-center gap-1"
                onClick={handleDeletePost}
              >
                {svgDeleteBlue}
                {t("delete")}
              </button>
            </div>
          )}

          {/* Edit a post Pop up window */}
          <Popup
            trigger={
              canEdit ? (
                <div
                  className={`flex justify-start mt-1 w-full hover:bg-white/50 p-1 rounded-md`}
                >
                  <button className="h-fit w-fit text-secondary flex flex-row items-center gap-1">
                    {svgEditBlue}
                    {t("edit")}
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
              post={post}
            />
          </Popup>
        </div>
      </div>
    </div>
  );
};

export default PostMenu;
