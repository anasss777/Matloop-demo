"use client";

import { useLocale, useTranslations } from "next-intl";
import { createSharedPathnamesNavigation } from "next-intl/navigation";

export const locales = ["ar", "en"];
const { Link } = createSharedPathnamesNavigation({ locales });

const Account = () => {
  const t = useTranslations("accountHeader");
  const locale = useLocale();

  return (
    <div className="hidden justify-end pr-16 lg:flex lg:pr-0">
      <div
        className={`group relative hidden lg:block lg:hover:contrast-[110%] contrast-[95%] py-1 ${
          locale === "ar" && "rtl"
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          height="40px"
          width="40px"
          className="text-white"
        >
          <path d="M12 2C6.579 2 2 6.579 2 12s4.579 10 10 10 10-4.579 10-10S17.421 2 12 2zm0 5c1.727 0 3 1.272 3 3s-1.273 3-3 3c-1.726 0-3-1.272-3-3s1.274-3 3-3zm-5.106 9.772c.897-1.32 2.393-2.2 4.106-2.2h2c1.714 0 3.209.88 4.106 2.2C15.828 18.14 14.015 19 12 19s-3.828-.86-5.106-2.228z" />
        </svg>

        {/* {status === "authenticated" ? (
          <div
            className={`border border-primary relative top-full hidden w-[150px] rounded-md bg-white p-4 transition-[top] duration-300
          group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:opacity-0 lg:shadow-lg lg:group-hover:visible 
          lg:group-hover:top-full ${locale === "ar" ? "left-0" : "right-0"}`}
          >
            <Link
              locale={locale}
              href="/account"
              className="block rounded py-1 text-sm text-body-color hover:text-primary"
            >
              {t("account")}
            </Link>
            <Link
              locale={locale}
              href="/withdraw"
              className="block rounded py-1 text-sm text-body-color hover:text-primary"
            >
              {t("mony")}
            </Link>
            <Link
              locale={locale}
              href="/forget-password"
              className="block rounded py-1 text-sm text-body-color hover:text-primary"
            >
              {t("forgetPassword")}
            </Link>
            <button className="block rounded py-1 text-sm text-body-color hover:text-primary">
              {t("signout")}
            </button>
          </div>
        ) : ( */}
        <div
          className={`border border-primary relative top-full hidden w-[150px] rounded-md bg-white p-4 transition-[top] duration-300
          group-hover:opacity-100 lg:invisible lg:absolute lg:top-[110%] lg:block lg:opacity-0 lg:shadow-lg lg:group-hover:visible
          lg:group-hover:top-full ${locale === "ar" ? "left-0" : "right-0"}`}
        >
          <Link
            locale={locale}
            href="/sign-in"
            className="block rounded p-2 text-sm text-body-color hover:text-primary"
          >
            {t("signIn")}
          </Link>
          <Link
            locale={locale}
            href="/sign-up"
            className="block rounded p-2 text-sm text-body-color hover:text-primary"
          >
            {t("signUp")}
          </Link>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default Account;
