"use client";

import { svgGoogle, svgLogo } from "@/components/svgsPath";
import firebase from "@/firebase";
import { handleSignIn, handleSignInWithGoogle } from "@/utils/auth";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React, { FormEvent, useEffect, useState } from "react";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const SignIn = () => {
  const t = useTranslations("signUp");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [user, setUser] = useState<firebase.User | null | undefined>(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const fetchUser = handleSignIn(userInfo.email, userInfo.password);
    if ((await fetchUser) === null) {
      alert(t("notRegistered"));
    }
    setUser(await fetchUser);
  };

  const handleSubmitWithGoogle = async () => {
    const fetchUser = handleSignInWithGoogle();
    if ((await fetchUser) === null) {
      alert(t("notRegistered"));
    }
    setUser(await fetchUser);
  };

  if (user) {
    router.push(`/${locale}/profile`);
  }

  return (
    <div
      className={`flex flex-col justify-center items-center w-full h-[70vh] ${
        isArabic ? "rtl" : "ltr"
      }`}
    >
      <form
        name="signUp"
        onSubmit={handleSubmit}
        className={`flex flex-col gap-5 justify-center items-center bg-white dark:bg-gray-800 p-5 rounded-md shadow-Card2`}
      >
        {/* Logo */}
        <Link
          href="/"
          locale={locale}
          className={`flex flex-row justify-center items-center gap-1`}
        >
          <span>{svgLogo}</span>

          <p>مطلوب</p>
        </Link>

        <div className={`flex flex-col gap-5 w-full`}>
          <input
            name="email"
            type="email"
            placeholder={t("email")}
            value={userInfo.email}
            onChange={handleInputChange}
            required
            className={`rounded-md outline-none border focus:border-primary/50 p-2 ${
              isArabic && "rtl"
            }`}
          />
          <input
            name="password"
            type="password"
            placeholder={t("password")}
            value={userInfo.password}
            onChange={handleInputChange}
            required
            className={`rounded-md outline-none border focus:border-primary/50 p-2 ${
              isArabic && "rtl"
            }`}
          />
        </div>
        <button type="submit" className={`btn2 bg-secondary`}>
          {t("signIn")}
        </button>
        <div className={`border-t border-t-primary/60 w-full`}></div>
        <div
          onClick={handleSubmitWithGoogle}
          className={`btn2 bg-primary cursor-pointer flex flex-row gap-1 items-center`}
        >
          <span className={`bg-white p-1 rounded-full shadow-Card2`}>
            {svgGoogle}
          </span>
          {t("signInWithGoogle")}
        </div>

        <p className="font-medium text-secondary">
          {t("notMember")}
          <Link
            locale={locale}
            href="/sign-up"
            className="text-primary font-bold hover:underline"
          >
            {t("signup")}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
