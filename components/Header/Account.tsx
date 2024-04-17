"use client";

import { useLocale, useTranslations } from "next-intl";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { useEffect, useState } from "react";
import firebase from "@/firebase";
import { useRouter } from "next/navigation";
import { handleSignOut } from "@/utils/auth";
import Image from "next/image";
import { svgUser } from "../svgsPath";

export const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const Account = () => {
  const t = useTranslations("accountHeader");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [user, setUser] = useState<firebase.User | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    const isSignedOut = await handleSignOut();

    if (isSignedOut) {
      router.push("/sign-in");
    }
  };

  useEffect(() => {
    if (user) {
      const docRef = firebase.firestore().collection("profiles").doc(user.uid);
      docRef
        .get()
        .then((doc) => {
          if (doc.exists) {
            setUserData(doc.data());
          } else {
            console.log("No such document!");
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    }
  }, [user]);

  if (!userData) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="40px"
        width="40px"
        className="text-white"
      >
        <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z" />
      </svg>
    );
  }

  return (
    <div className="hidden justify-end pr-16 lg:flex lg:pr-0">
      <div
        className={`group relative hidden lg:block lg:hover:contrast-[110%] contrast-[95%] py-1 ${
          locale === "ar" && "rtl"
        }`}
      >
        {user && userData.profileImageSrc ? (
          <Image
            src={userData.profileImageSrc}
            alt="Poster profile image"
            height={400}
            width={400}
            className="object-scale-down h-10 w-10 rounded-full shadow-lg"
          />
        ) : (
          <span>{svgUser}</span>
        )}

        {user ? (
          <div
            className={`border border-primary relative top-full hidden w-[125px] rounded-md bg-white py-2 transition-[top] duration-300
          group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:opacity-0 lg:shadow-lg lg:group-hover:visible 
          lg:group-hover:top-full ${locale === "ar" ? "left-0" : "right-0"}`}
          >
            <Link
              locale={locale}
              href="/profile"
              className={`block rounded py-2 px-3 text-sm hover:text-primary w-full ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              {t("profile")}
            </Link>
            <Link
              locale={locale}
              href="/change-password"
              className={`block rounded py-2 px-3 text-sm hover:text-primary w-full ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              {t("changePassword")}
            </Link>
            <button
              className={`block rounded py-2 px-3 text-sm hover:text-primary w-full ${
                isArabic ? "text-right" : "text-left"
              }`}
              onClick={signOut}
            >
              {t("signout")}
            </button>
          </div>
        ) : (
          <div
            className={`border border-primary relative top-full hidden w-[125px] rounded-md bg-white py-2 transition-[top] duration-300
          group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:opacity-0 lg:shadow-lg lg:group-hover:visible
          lg:group-hover:top-full ${locale === "ar" ? "left-0" : "right-0"}`}
          >
            <Link
              locale={locale}
              href="/sign-in"
              className={`block rounded py-2 px-3 text-sm hover:text-primary w-full ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              {t("signIn")}
            </Link>
            <Link
              locale={locale}
              href="/sign-up"
              className={`block rounded py-2 px-3 text-sm hover:text-primary w-full ${
                isArabic ? "text-right" : "text-left"
              }`}
            >
              {t("signUp")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Account;
