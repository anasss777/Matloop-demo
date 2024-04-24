"use client";

import React, { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import MobileLocale from "../Header/MobileLocale";
import firebase from "@/firebase";
import Menu from "./Menu";
import { useRouter } from "next/navigation";
import { handleSignOut } from "@/utils/auth";
import ThemeSwitcher from "../ThemeSwitcher";

const NavbarElements = () => {
  const t = useTranslations("nav");
  const a = useTranslations("accountHeader");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [isMenuOpen, setMenuOpen] = useState(false);
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

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <button
        id="navbarToggler"
        onClick={toggleMenu}
        className={`absolute block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden ${
          locale === "ar" ? "left-2" : "right-2"
        }`}
      >
        <span
          className={`relative my-[6px] block h-[2px] w-[30px] bg-white ${
            isMenuOpen && "top-[7px] rotate-45"
          }`}
        ></span>
        <span
          className={`relative my-[6px] block h-[2px] w-[30px] bg-white ${
            isMenuOpen && "opacity-0"
          }`}
        ></span>
        <span
          className={`relative my-[6px] block h-[2px] w-[30px] bg-white ${
            isMenuOpen && "top-[-8px] -rotate-45"
          }`}
        ></span>
      </button>
      <nav
        id="navbarCollapse"
        className={`absolute top-16 ${
          locale === "ar" ? "left-1 lg:pr-4" : "right-1 lg:pl-4"
        } ${
          isMenuOpen ? "block" : "hidden"
        } w-full max-w-[250px] rounded-lg bg-white shadow-lg lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:py-0
        lg:shadow-none xl:px-6`}
      >
        <ul
          onClick={() => setMenuOpen(false)}
          className={`block lg:flex flex-row gap-5 border rounded-lg border-teal-700 dark:bg-gray-600 lg:dark:bg-transparent lg:border-none ${
            locale === "ar" && "text-right"
          }`}
        >
          <div
            className={`lg:hidden p-[6px] w-full h-fit rounded-t-lg mx-auto flex justify-center bg-gradient-to-l from-transparent
            via-primary/50 to-transparent`}
          >
            <ThemeSwitcher />
          </div>
          <Menu text={t("about")} href="/about-us" />
          <Menu text={t("jobs")} href="/jobs" />
          <Menu text={t("cars")} href="/cars" />
          <Menu text={t("realEstates")} href="/real-estate" />
          <Menu text={t("electronics")} href="/electronic-devices" />
          <Menu text={t("contact")} href="/contact-us" />

          {user ? (
            <div className="border-t border-t-primary w-[90%] justify-center mb-1 mx-auto lg:hidden">
              <Menu text={a("profile")} href="/profile" />
              <Menu text={a("changePassword")} href="/change-password" />
              <button
                className={`block rounded py-2 px-3 w-full ${
                  isArabic ? "text-right" : "text-left"
                }`}
                onClick={signOut}
              >
                {t("signout")}
              </button>
            </div>
          ) : (
            <div className="border-t border-t-primary w-[90%] justify-center mb-1 mx-auto lg:hidden">
              <Menu text={a("signIn")} href="/sign-in" />
              <Menu text={a("signUp")} href="/sign-up" />
            </div>
          )}

          <div className="lg:hidden w-[90%] border-t border-t-primary mx-auto flex flex-row justify-center items-center">
            <MobileLocale />
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default NavbarElements;
