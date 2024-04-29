"use client";

import React, { FormEvent, useEffect, useState } from "react";
import firebase from "@/firebase";
import { useRouter } from "next/navigation";
import { handleSignUp, handleSignUpWithGoogle } from "@/utils/auth";
import { useLocale, useTranslations } from "next-intl";
import { svgGoogle, svgLogo } from "@/components/svgsPath";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import { countries } from "@/components/countries";

const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const SignUp = () => {
  const t = useTranslations("signUp");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    phoneNumber: 0,
    country: "",
    password: "",
    confirmPassword: "",
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
    router.push(`/${locale}/profile`);
  }

  return (
    <div
      className={`flex flex-col justify-center items-center w-full h-[100vh] ${
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

        <div className={`flex sm:flex-row flex-col gap-4 w-full`}>
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
        </div>

        <div className={`flex sm:flex-row flex-col gap-4 w-full`}>
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
        </div>

        <div className={`flex sm:flex-row flex-col gap-4 w-full`}>
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
          <Autocomplete
            name="country"
            label={t("country")}
            className="w-full sm:w-44 h-10 sm:h-0"
            onSelect={handleInputChange}
          >
            {countries.map((country) => (
              <AutocompleteItem key={country.code} value={country.code}>
                {isArabic ? country.countryAr : country.countryEn}
              </AutocompleteItem>
            ))}
          </Autocomplete>
        </div>

        <div className={`flex sm:flex-row flex-col gap-4 w-full`}>
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
        </div>

        <button type="submit" className={`btn2 bg-secondary`}>
          {t("signUp")}
        </button>
        <div
          onClick={handleSubmitWithGoogle}
          className={`btn2 bg-primary cursor-pointer flex flex-row gap-1 items-center`}
        >
          <span className={`bg-white p-1 rounded-full shadow-Card2`}>
            {svgGoogle}
          </span>
          {t("signUpWithGoogle")}
        </div>

        <div className={`border-t border-t-primary/60 w-full`}></div>

        <p className="font-medium text-secondary">
          {t("alreadyMember")}
          <Link
            locale={locale}
            href="/sign-in"
            className="text-primary font-bold hover:underline"
          >
            {t("signin")}
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
