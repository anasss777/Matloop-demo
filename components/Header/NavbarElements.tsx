"use client";

import React, { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import MobileLocale from "../Header/MobileLocale";
import { createSharedPathnamesNavigation } from "next-intl/navigation";
import MenuWithSubmenu from "./MenuWithSubmenu";
import Menu from "./Menu";

export const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const NavbarElements = () => {
  const t = useTranslations("nav");
  const a = useTranslations("accountHeader");
  const locale = useLocale();
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <button
        id="navbarToggler"
        onClick={toggleMenu}
        className={`absolute block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden ${
          locale === "ar" ? "left-0" : "right-0"
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
          className={`block lg:flex flex-row gap-5 border rounded-lg border-teal-700 ${
            locale === "ar" && "text-right"
          }`}
        >
          <Menu text={t("about")} href="/about-us" />
          <Menu text={t("contact")} href="/contact-us" />

          <div className="border-t border-t-primary w-[90%] justify-center mb-1 mx-auto lg:hidden">
            <Menu text={a("signIn")} href="/sign-in" />
            <Menu text={a("signUp")} href="/sign-up" />
          </div>

          <div className="lg:hidden w-[90%] border-t border-t-primary mx-auto flex flex-row justify-center items-center">
            <MobileLocale />
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default NavbarElements;
