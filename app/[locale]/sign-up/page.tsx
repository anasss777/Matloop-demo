"use client";

import React, { FormEvent, useEffect, useState } from "react";
import firebase from "@/firebase";
import { useRouter } from "next/navigation";
import { handleSignUp, handleSignUpWithGoogle } from "@/utils/auth";
import { Profile } from "@/types/profile";
import { useLocale, useTranslations } from "next-intl";
import { svgGoogle } from "@/components/svgsPath";

const SignUp = () => {
  const t = useTranslations("signUp");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [userInfo, setUserInfo] = useState<Profile>({
    firstName: "",
    lastName: "",
    profileImageSrc: "",
    username: "",
    email: "",
    phoneNumber: 0,
    country: "",
    password: "",
    confirmPassword: "",
    contactInfo: [""],
    sentMessages: [""],
    receivedMessages: [""],
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

    const fetchUser = handleSignUp(userInfo);
    setUser(await fetchUser);
  };

  const handleSubmitWithGoogle = async () => {
    const fetchUser = handleSignUpWithGoogle();
    setUser(await fetchUser);
  };

  if (user) {
    router.push("/profile");
  }

  return (
    <div
      className={`flex flex-col justify-center items-center w-full py-20 rtl`}
    >
      <form
        name="signUp"
        onSubmit={handleSubmit}
        className={`flex flex-col gap-5 justify-center items-center bg-white p-5 rounded-md shadow-Card2`}
      >
        <input
          name="firstName"
          type="text"
          placeholder={t("firstName")}
          value={userInfo.firstName}
          onChange={handleInputChange}
          required
          className={`rounded-md outline-none border focus:border-primary/50 p-2 ${
            isArabic && "rtl"
          }`}
        />
        <input
          name="lastName"
          type="text"
          placeholder={t("lastName")}
          value={userInfo.lastName}
          onChange={handleInputChange}
          required
          className={`rounded-md outline-none border focus:border-primary/50 p-2 ${
            isArabic && "rtl"
          }`}
        />
        <input
          name="username"
          type="text"
          placeholder={t("username")}
          value={userInfo.username}
          onChange={handleInputChange}
          required
          className={`rounded-md outline-none border focus:border-primary/50 p-2 ${
            isArabic && "rtl"
          }`}
        />
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
          name="phoneNumber"
          type="tel"
          placeholder={t("phoneNumber")}
          value={userInfo.phoneNumber}
          onChange={handleInputChange}
          required
          className={`rounded-md outline-none border focus:border-primary/50 p-2 ${
            isArabic && "rtl"
          }`}
        />
        <input
          name="country"
          type="text"
          placeholder={t("country")}
          value={userInfo.country}
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
        <input
          name="confirmPassword"
          type="password"
          placeholder={t("confirmPassword")}
          value={userInfo.confirmPassword}
          onChange={handleInputChange}
          required
          className={`rounded-md outline-none border focus:border-primary/50 p-2 ${
            isArabic && "rtl"
          }`}
        />
        <button type="submit" className={`btn`}>
          {t("signUp")}
        </button>
        <div className={`border-t border-t-primary/60 w-full`}></div>
        <div
          onClick={handleSubmitWithGoogle}
          className={`btn2 bg-primary cursor-pointer flex flex-row gap-1 items-center`}
        >
          <span className={`bg-white p-1 rounded-full shadow-Card2`}>
            {svgGoogle}
          </span>
          {t("signUpWithGoogle")}
        </div>
      </form>
    </div>
  );
};

export default SignUp;
