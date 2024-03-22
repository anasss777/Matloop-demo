"use client";

import { Comment } from "@/types/comment";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import React, { useState } from "react";
import { svgCloseRed, svgError, svgImage } from "../svgsPath";
import firebase from "@/firebase";
import Swal from "sweetalert2";

type Props = {
  comment: Comment;
};

const EditCommentImages = ({ comment }: Props) => {
  const t = useTranslations("postCard");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [commentsImages, setCommentsImages] = useState(comment.uploadedImages);
  const [imagesError, setImagesError] = useState(commentsImages.length > 10);

  const handleUploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setImagesError(false);
    const files = e.target.files;

    if (files) {
      if (files.length + comment.uploadedImages.length > 10) {
        setImagesError(true);
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
        let imageUrls = commentData.uploadedImages;

        if (files) {
          for (let i = 0; i < files.length; i++) {
            let imageName = files[i].name;
            let imageRef = firebase
              .storage()
              .ref()
              .child(`images/${imageName}`);

            // Check if the file already exists
            try {
              await imageRef.getMetadata();
              // If the file exists, create a new name
              let timestamp = new Date().getTime();
              imageName = `${timestamp}_${imageName}`;
              imageRef = firebase.storage().ref().child(`images/${imageName}`);
            } catch (error) {
              // File does not exist, continue with the original name
            }

            await imageRef.put(files[i]);
            let url = await imageRef.getDownloadURL();
            imageUrls.push(url); // Add the new image URL
          }
        } else {
          console.log(`files is NULL`);
        }

        await docRefComment
          .update({
            uploadedImages: imageUrls,
          })
          .then(() => {
            console.log("Successfully updated uploadedImages");
          })
          .catch((error) => {
            console.log("Error updating images: ", error);
          });

        setCommentsImages(imageUrls);
      } else {
        console.log("Can't fetch commmentData!");
      }
    } else {
      console.log("Files is undefined");
    }
  };

  const handleDeleteImage = (image: string) => {
    Swal.fire({
      title: t("sure"),
      text: t("deleteImageWarning"),
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
          .refFromURL(image)
          .delete()
          .then(async () => {
            console.log("File deleted successfully.");

            const newCommentsImages = commentsImages.filter((i) => i !== image);
            setCommentsImages(newCommentsImages);

            let docRefComment = firebase
              .firestore()
              .collection("comments")
              .doc(comment.commentId);

            await docRefComment
              .update({
                uploadedImages:
                  firebase.firestore.FieldValue.arrayRemove(image),
              })
              .then(() => {
                console.log("Image deleted successfully from Firestore");
              })
              .catch((error: any) => {
                console.log("Error deleting from Firestore: ", error);
              });

            Swal.fire({
              text: t("imageDeleted"),
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
      {/* Images */}
      {commentsImages && (
        <div
          className={`flex flex-wrap gap-3 px-1 mt-1 mb-5 w-full justify-center`}
        >
          {commentsImages.map((image, index) => (
            <div key={index}>
              <span
                onClick={() => handleDeleteImage(image)}
                className={`relative top-[13%] left-[17%]`}
              >
                {svgCloseRed}
              </span>
              <Image
                src={image}
                width={500}
                height={500}
                alt={`Image ${index + 1}`}
                className={`object-cover h-16 w-16 rounded-md shadow-md border border-gray-400`}
              />
            </div>
          ))}
        </div>
      )}

      <p className={`text-secondary font-semibold mb-2 ${!isArabic && "ltr"}`}>
        {t("uploadedImages")}
        <span className={`font-bold text-gray-600`}>
          {commentsImages?.length || 0}
        </span>
      </p>

      {imagesError && (
        <p
          className={`flex flex-row items-center gap-1 text-[#dc2626] bg-gray-300 w-fit rounded-md px-1 text-sm shadow-md mb-3 ${
            !isArabic && "ltr"
          }`}
        >
          <span>{svgError}</span> {t("imagesError")}
        </p>
      )}

      {/* Add up to 10 images to a comment */}
      <button className="">
        <label htmlFor={`imageInput${comment.commentId}`}>
          <span
            className={`flex bg-secondary/30 h-fit w-fit p-1 rounded-full border border-secondary shadow-md`}
          >
            {svgImage}
          </span>
        </label>
        <input
          type="file"
          id={`imageInput${comment.commentId}`}
          multiple
          accept="image/*"
          className="absolute left-[-9999px]"
          onChange={(e) => handleUploadImage(e)}
        />
      </button>
    </div>
  );
};

export default EditCommentImages;
