import firebase from "@/firebase";
import React from "react";
import { svgLink } from "../svgsPath";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useLocale, useTranslations } from "next-intl";
import Swal from "sweetalert2";

const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

type Props = {
  userID: string;
  name: string;
  username: string;
  email: string;
  country: string;
  phoneNumber: number;
  profileLink: string;
  ban: boolean;
};

const UserRow = ({
  userID,
  name,
  username,
  email,
  country,
  phoneNumber,
  profileLink,
  ban,
}: Props) => {
  const locale = useLocale();
  const t = useTranslations("usersList");

  const toggleBanStatus = async () => {
    const userRef = firebase.firestore().collection("profiles").doc(userID);

    // Fetch the current data of the user
    const doc = await userRef.get();
    if (!doc.exists) {
      console.log("Profile does not exist!");
      return;
    }

    // update data
    userRef
      .update({
        ban: !ban,
      })
      .then(() => {
        console.log("Profile updated successfully.");
      })
      .catch((error) => {
        console.error("Error updating Profile: ", error);
      });
  };

  return (
    <tr className="my-4">
      <td className={`text-gray-400 text-center py-3`}>{userID}</td>
      <td className={`text-gray-400 text-center py-3`}>{name}</td>
      <td className={`text-gray-400 text-center py-3`}>{username}</td>
      <td className={`text-gray-400 flex justify-center py-3`}>{email}</td>
      <td className={`text-gray-400 text-center py-3`}>{country}</td>
      <td className={`text-gray-400 text-center py-3`}>{phoneNumber}</td>
      <td className={`text-gray-400 text-center py-3`}>
        {ban ? (
          <span
            className={`btn2 text-white cursor-pointer bg-[#d33]`}
            onClick={() => {
              toggleBanStatus();
              Swal.fire({
                text: `${t("userUnbanned")}: ${name}`,
                icon: "success",
                confirmButtonColor: "#4682b4",
                confirmButtonText: t("ok"),
              });
            }}
          >
            {t("banned")}
          </span>
        ) : (
          <span
            className={`btn2 text-white cursor-pointer bg-primary`}
            onClick={() => {
              toggleBanStatus();
              Swal.fire({
                text: `${t("userBanned")}: ${name}`,
                icon: "success",
                confirmButtonColor: "#4682b4",
                confirmButtonText: t("ok"),
              });
            }}
          >
            {t("unbanned")}
          </span>
        )}
      </td>
      <td className={`text-gray-400 flex justify-center py-3`}>
        <Link
          href={profileLink}
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

export default UserRow;
