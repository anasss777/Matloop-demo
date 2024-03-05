"use client";

import { useLocale } from "next-intl";
import React, { useState } from "react";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

type Props = {
  text: string;
  items: string[];
  itemsHref: string[];
};

const MenuWithSubmenu = ({ text, items, itemsHref }: Props) => {
  const locale = useLocale();
  const [isSubmenuOpen, setSubmenuOpen] = useState(false);

  const toggleSubmenu = () => {
    setSubmenuOpen(!isSubmenuOpen);
  };

  return (
    <div>
      {/* Phone Mode */}
      <li
        className={`lg:hidden relative flex flex-col ${
          locale === "ar" ? "justify-end" : "ml-3"
        }`}
      >
        <button
          onClick={toggleSubmenu}
          className={`flex items-center py-2 font-medium text-base group-hover:text-primary gap-2 ${
            locale === "ar" && "rtl"
          }`}
        >
          <p>{text}</p>
          <svg
            className="fill-current"
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.99999 14.9C7.84999 14.9 7.72499 14.85 7.59999 14.75L1.84999 9.10005C1.62499 8.87505 1.62499 8.52505 1.84999 8.30005C2.07499 8.07505 2.42499 8.07505 2.64999 8.30005L7.99999 13.525L13.35 8.25005C13.575 8.02505 13.925 8.02505 14.15 8.25005C14.375 8.47505 14.375 8.82505 14.15 9.05005L8.39999 14.7C8.27499 14.825 8.14999 14.9 7.99999 14.9Z" />
          </svg>
        </button>

        <div
          className={`lg:border border-primary relative top-full lg:w-[250px] w-[150px] rounded-md bg-white lg:p-4 pl-8
          transition-[top] duration-300 group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:opacity-0 lg:shadow-lg
          lg:group-hover:visible lg:group-hover:top-full ${
            locale === "ar" ? "-right-8" : "left-0"
          } ${isSubmenuOpen ? "visible top-full block" : "hidden"}`}
        >
          {items.map((item, index) => (
            <Link
              locale={locale}
              key={index}
              href={itemsHref[index]}
              className="block rounded py-[10px] px-1 text-sm text-body-color hover:text-primary"
            >
              {item}
            </Link>
          ))}
        </div>
      </li>

      {/* Desktop Mode */}
      <li className="submenu-item group relative hidden lg:block">
        <p
          className={`relative flex items-center gap-2 py-2 font-bold text-base text-dark group-hover:text-primary lg:mr-0 cursor-pointer
              lg:ml-8 lg:inline-flex lg:py-6 lg:pl-0 lg:pr-4 lg:text-white lg:group-hover:text-white lg:group-hover:opacity-70 xl:ml-10 ${
                locale === "ar" && "rtl"
              }`}
        >
          {text}
          <svg
            className="fill-current "
            width="16"
            height="20"
            viewBox="0 0 16 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M7.99999 14.9C7.84999 14.9 7.72499 14.85 7.59999 14.75L1.84999 9.10005C1.62499 8.87505 1.62499 8.52505 1.84999 8.30005C2.07499 8.07505 2.42499 8.07505 2.64999 8.30005L7.99999 13.525L13.35 8.25005C13.575 8.02505 13.925 8.02505 14.15 8.25005C14.375 8.47505 14.375 8.82505 14.15 9.05005L8.39999 14.7C8.27499 14.825 8.14999 14.9 7.99999 14.9Z" />
          </svg>
        </p>
        <div
          className="border border-primary relative top-full left-0 hidden w-fit rounded-md bg-white p-2 transition-[top]
              duration-300 group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:opacity-0 lg:shadow-lg
              lg:group-hover:visible lg:group-hover:top-full"
        >
          {items.map((item, index) => (
            <Link
              locale={locale}
              key={index}
              href={itemsHref[index]}
              className="block rounded py-[10px] px-4 text-sm text-body-color hover:text-primary"
            >
              {item}
            </Link>
          ))}
        </div>
      </li>
    </div>
  );
};

export default MenuWithSubmenu;
