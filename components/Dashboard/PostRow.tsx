import firebase from "@/firebase";
import { Timestamp } from "firebase/firestore";
import React from "react";
import { svgLink } from "../svgsPath";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useLocale, useTranslations } from "next-intl";
import Swal from "sweetalert2";

const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

type Props = {
  postId: string;
  postTitle: string;
  svgDevices: JSX.Element;
  done: boolean;
  createdAt: Timestamp;
  category: string;
  visibility: boolean;
  postLink: string;
};

const PostRow = ({
  postId,
  postTitle,
  svgDevices,
  done,
  createdAt,
  category,
  visibility,
  postLink,
}: Props) => {
  const t = useTranslations("usersList");
  const locale = useLocale();

  const changeVisibility = async () => {
    if (category === "cars") {
      const userRef = firebase.firestore().collection("posts").doc(postId);

      // Fetch the current data of the post
      const doc = await userRef.get();
      if (!doc.exists) {
        console.log("Post does not exist!");
        return;
      }

      // update data
      userRef
        .update({
          visibility: !visibility,
        })
        .then(() => {
          console.log("Post updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating Post: ", error);
        });
    } else if (category === "jobs") {
      const userRef = firebase.firestore().collection("jobsPosts").doc(postId);

      // Fetch the current data of the post
      const doc = await userRef.get();
      if (!doc.exists) {
        console.log("Post does not exist!");
        return;
      }

      // update data
      userRef
        .update({
          visibility: !visibility,
        })
        .then(() => {
          console.log("Post updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating Post: ", error);
        });
    } else if (category === "realEstates") {
      const userRef = firebase
        .firestore()
        .collection("realEstatePosts")
        .doc(postId);

      // Fetch the current data of the post
      const doc = await userRef.get();
      if (!doc.exists) {
        console.log("Post does not exist!");
        return;
      }

      // update data
      userRef
        .update({
          visibility: !visibility,
        })
        .then(() => {
          console.log("Post updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating Post: ", error);
        });
    } else if (category === "electronicDevices") {
      const userRef = firebase
        .firestore()
        .collection("electronicDevices")
        .doc(postId);

      // Fetch the current data of the post
      const doc = await userRef.get();
      if (!doc.exists) {
        console.log("Post does not exist!");
        return;
      }

      // update data
      userRef
        .update({
          visibility: !visibility,
        })
        .then(() => {
          console.log("Post updated successfully.");
        })
        .catch((error) => {
          console.error("Error updating Post: ", error);
        });
    }
  };

  return (
    <tr className="my-4">
      <td className={`text-gray-400 text-center py-3`}>{postId}</td>
      <td className={`text-gray-400 text-center py-3`}>{postTitle}</td>
      <td className={`text-gray-400 flex justify-center py-3`}>
        <span className={`bg-primary/20 border border-primary p-1 rounded-md`}>
          {svgDevices}
        </span>
      </td>
      <td className={`text-gray-400 text-center py-3`}>
        {" "}
        <span
          className={`rounded-md px-1 text-white ${
            done ? "bg-secondary" : "bg-primary"
          }`}
        >
          {done ? t("done") : t("matloop")}
        </span>{" "}
      </td>
      <td className={`text-gray-400 text-center py-3`}>
        {visibility ? (
          <span
            className={`btn2 text-white cursor-pointer bg-primary`}
            onClick={() => {
              changeVisibility();
              Swal.fire({
                text: `${t("postNotVisible")}: ${postTitle}`,
                icon: "success",
                confirmButtonColor: "#4682b4",
                confirmButtonText: t("ok"),
              });
            }}
          >
            {t("visible")}
          </span>
        ) : (
          <span
            className={`btn2 text-white cursor-pointer bg-[#d33]`}
            onClick={() => {
              changeVisibility();
              Swal.fire({
                text: `${t("postVisible")}: ${postTitle}`,
                icon: "success",
                confirmButtonColor: "#4682b4",
                confirmButtonText: t("ok"),
              });
            }}
          >
            {t("notVisible")}
          </span>
        )}
      </td>
      <td className={`text-gray-400 text-center py-3`}>
        {createdAt.toDate().toLocaleDateString()}
      </td>
      <td className={`text-gray-400 flex justify-center py-3`}>
        <Link
          href={postLink}
          locale={locale}
          target="_blank"
          className={`bg-primary/20 border border-primary p-1 rounded-md`}
        >
          {svgLink}
        </Link>
      </td>
    </tr>
  );
};

export default PostRow;
