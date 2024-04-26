"use client";

import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useRef, useState } from "react";
import { svgDeleteBlue, svgEditBlue, svgMenu, svgTick } from "../svgsPath";
import Popup from "reactjs-popup";
import firebase from "@/firebase";
import Swal from "sweetalert2";
import { DevicePost } from "@/types/post";
import { deleteDevicePost, devicePostFulfilled } from "@/utils/devicePost";
import EDEditPost from "./EDEditPost";

type Props = {
  post: DevicePost;
};

const EDPostMenu = ({ post }: Props) => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("postCard");
  const [canEdit, setCanEdit] = useState(false);
  const [openEditPost, setOpenEditPost] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setCanEdit(post.poster.userId === user.uid);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [post.poster.userId]);

  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDeletePost = () => {
    setOpenMenu(false);
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
        deleteDevicePost(post);
        Swal.fire({
          text: t("postDeleted"),
          icon: "success",
          confirmButtonColor: "#4682b4",
          confirmButtonText: t("ok"),
        });
      }
    });
  };

  const handleRequestFulfilled = () => {
    setOpenMenu(false);
    devicePostFulfilled(post);
    Swal.fire({
      text: t("done"),
      icon: "success",
      confirmButtonColor: "#4682b4",
      confirmButtonText: t("ok"),
    });
  };

  return (
    <div className="justify-end flex">
      <div
        ref={menuRef}
        className={`relative block hover:contrast-[110%] contrast-[95%] py-1 ${
          isArabic && "rtl"
        }`}
      >
        {canEdit && (
          <button onClick={() => setOpenMenu(!openMenu)}>{svgMenu}</button>
        )}
        <div
          className={`border border-secondary w-fit rounded-md bg-[#cfdfeb] dark:bg-gray-700 p-1 transition-[top] duration-300 absolute
          block shadow-lg ${isArabic ? "left-0" : "right-0"} ${
            openMenu
              ? "opacity-100 visible top-[60%]"
              : "opacity-0 invisible top-[20%]"
          }`}
        >
          {/* Delete a post */}
          {canEdit && (
            <div
              className={`flex justify-start mb-1 w-full hover:dark:bg-gray-600 hover:bg-white/50 p-1 rounded-md`}
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
                  className={`flex justify-start mt-1 w-full hover:dark:bg-gray-600 hover:bg-white/50 p-1 rounded-md`}
                >
                  <button
                    onClick={() => setOpenMenu(false)}
                    className="h-fit w-fit text-secondary flex flex-row items-center gap-1"
                  >
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
            <EDEditPost
              openEditPost={openEditPost}
              setOpenEditPost={setOpenEditPost}
              post={post}
            />
          </Popup>

          {/* Post fulfilled */}
          {canEdit && (
            <div
              className={`flex justify-start mb-1 w-full hover:dark:bg-gray-600 hover:bg-white/50 p-1 rounded-md`}
            >
              <button
                className="h-fit w-fit text-secondary flex flex-row items-center gap-1"
                onClick={handleRequestFulfilled}
              >
                {svgTick}
                {t("fulfilled")}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EDPostMenu;
