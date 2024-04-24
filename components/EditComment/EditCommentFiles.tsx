"use client";

import { Comment } from "@/types/comment";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
import { svgCloseRed, svgError, svgFile, svgFileBig } from "../svgsPath";
import Link from "next/link";
import Swal from "sweetalert2";
import firebase from "@/firebase";

type Props = {
  comment: Comment;
};

const EditCommentFiles = ({ comment }: Props) => {
  const t = useTranslations("postCard");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [commentsFiles, setCommentsFiles] = useState(comment.uploadedFiles);
  const [filesError, setFilesError] = useState(commentsFiles.length > 3);

  const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilesError(false);
    const files = e.target.files;

    if (files) {
      if (files.length + comment.uploadedFiles.length > 3) {
        setFilesError(true);
        return;
      }
      let docRefComment = firebase
        .firestore()
        .collection("comments")
        .doc(comment.commentId);

      // Fetch the existing comment document
      let commentDoc = await docRefComment.get();
      let commentData: Comment = commentDoc.data() as Comment;

      if (commentData) {
        let fileUrls = commentData.uploadedFiles;

        if (files) {
          for (let i = 0; i < files.length; i++) {
            let timestamp = new Date().getTime();
            let fileName = `${timestamp}_${files[i].name}`;
            let fileRef = firebase.storage().ref().child(`files/${fileName}`);

            await fileRef.put(files[i]);
            let url = await fileRef.getDownloadURL();
            fileUrls.push(url); // Add the new file URL
          }
        } else {
          console.log(`files is NULL`);
        }

        await docRefComment
          .update({
            uploadedFiles: fileUrls,
          })
          .then(() => {
            console.log("Successfully updated uploadedFiles");
          })
          .catch((error) => {
            console.log("Error updating files: ", error);
          });

        setCommentsFiles(fileUrls);
      } else {
        console.log("Can't fetch commmentData!");
      }
    } else {
      console.log("Files is undefined");
    }
  };

  const handleDeleteFile = (file: string) => {
    Swal.fire({
      title: t("sure"),
      text: t("deleteFileWarning"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#4682b4",
      cancelButtonText: t("cancel"),
      confirmButtonText: t("yesDelete"),
    }).then((result) => {
      if (result.isConfirmed) {
        firebase
          .storage()
          .refFromURL(file)
          .delete()
          .then(async () => {
            console.log("File deleted successfully.");

            const newCommentsFiles = commentsFiles.filter((i) => i !== file);
            setCommentsFiles(newCommentsFiles);

            let docRefComment = firebase
              .firestore()
              .collection("comments")
              .doc(comment.commentId);

            await docRefComment
              .update({
                uploadedFiles: firebase.firestore.FieldValue.arrayRemove(file),
              })
              .then(() => {
                console.log("File deleted successfully from Firestore");
              })
              .catch((error: any) => {
                console.log("Error deleting from Firestore: ", error);
              });

            Swal.fire({
              text: t("fileDeleted"),
              icon: "success",
              confirmButtonColor: "#4682b4",
              confirmButtonText: t("ok"),
            });
          })
          .catch((error: any) => {
            console.error("Error deleting file: ", error);
            Swal.fire({
              title: t("error"),
              text: t("tryLater"),
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className={`flex flex-col justify-center items-center w-full`}>
      {/* pdf file */}
      {commentsFiles && (
        <div
          className={`flex flex-row gap-3 ml-[4px] mr-0  ${
            isArabic && "mr-[4px] ml-0"
          }`}
        >
          {commentsFiles.map((file, index) => (
            <div key={index}>
              <span
                onClick={() => handleDeleteFile(file)}
                className={`relative top-[20%] left-[17%]`}
              >
                {svgCloseRed}
              </span>
              <Link href={file} target="_blank">
                <div
                  className={`flex flex-row my-2 bg-gray-200 dark:bg-gray-600 h-fit w-fit py-1 px-2 rounded-lg shadow-md border
                  border-gray-300 dark:border-gray-400`}
                >
                  {svgFileBig}
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}

      <p className={`text-secondary font-semibold mb-2 ${!isArabic && "ltr"}`}>
        {t("uploadedFiles")}
        <span className={`font-bold text-gray-600`}>
          {commentsFiles?.length || 0}
        </span>
      </p>

      {filesError && (
        <p
          className={`flex flex-row items-center gap-1 text-[#dc2626] bg-gray-300 w-fit rounded-md px-1 text-sm shadow-md mb-3 ${
            !isArabic && "ltr"
          }`}
        >
          <span>{svgError}</span> {t("filesError")}
        </p>
      )}

      {/* Add up to 3 files to a comment */}
      <button className="">
        <label htmlFor={`fileInput${comment.commentId}`}>
          <span
            className={`flex bg-secondary/30 dark:bg-secondary/50 h-fit w-fit p-1 rounded-full border border-secondary shadow-md`}
          >
            {svgFile}
          </span>
        </label>
        <input
          type="file"
          id={`fileInput${comment.commentId}`}
          multiple
          accept="application/pdf"
          className="absolute left-[-9999px]"
          onChange={(e) => handleUploadFile(e)}
        />
      </button>
    </div>
  );
};

export default EditCommentFiles;
