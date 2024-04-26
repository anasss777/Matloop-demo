"use client";

import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import { useLocale, useTranslations } from "next-intl";
import { Profile } from "@/types/profile";
import UserRow from "./UserRow";
import { searchProfiles } from "@/utils/searchUsers";
import SearchInput from "../SearchInput";

const UsersList = () => {
  const t = useTranslations("usersList");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [searchedprofiles, setSearchedProfiles] = useState<Profile[]>([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("profiles")
      .onSnapshot((snapshot) => {
        const newUsers: Profile[] = []; // Create a new array to hold updated users
        snapshot.forEach((doc) => {
          newUsers.push({
            ...doc.data(),
          } as Profile);
        });
        setProfiles(newUsers);
        setSearchedProfiles(newUsers);
      });

    // Unsubscribe from Firestore listener when component unmounts
    return () => unsubscribe();
  }, []);

  const handleSearchProfilesChange = (term: string) => {
    setSearchedProfiles(searchProfiles(term, profiles));
  };

  return (
    <div className={`w-full`}>
      <div className={`flex justify-center`}>
        <SearchInput onSearchTermChange={handleSearchProfilesChange} />
      </div>

      <table className={`w-full`}>
        <tbody>
          <tr
            className={`bg-secondary shadow-Card2 py-2 px-5 rounded-full text-white`}
          >
            <th
              className={`p-2 ${
                isArabic ? "rounded-r-full" : "rounded-l-full"
              }`}
            >
              {t("id")}
            </th>
            <th className={`p-2`}>{t("name")}</th>
            <th className={`p-2`}>{t("username")}</th>
            <th className={`p-2`}>{t("email")}</th>
            <th className={`p-2`}>{t("country")}</th>
            <th className={`p-2`}>{t("phoneNumber")}</th>
            <th className={`p-2`}>{t("status")}</th>
            <th
              className={`p-2 ${
                isArabic ? "rounded-l-full" : "rounded-r-full"
              }`}
            >
              {t("link")}
            </th>
          </tr>

          {searchedprofiles.map(
            (
              { userId, name, username, email, country, phoneNumber, ban },
              index
            ) => (
              <UserRow
                key={index}
                userID={userId}
                name={name}
                username={username}
                email={email}
                country={country}
                phoneNumber={phoneNumber}
                profileLink={`/${userId}`}
                ban={ban}
              />
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;
