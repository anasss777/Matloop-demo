"use client";

import {
  fedeInAnimationVariants1,
  fedeInAnimationVariants2,
  fedeInAnimationVariants3,
  fedeInAnimationVariants4,
} from "@/utils/animations";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import React from "react";

const Hero = () => {
  const t = useTranslations("hero");
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div>
      <div
        className={`flex flex-col justify-center items-center w-full px-12 pb-5 pt-10 bg-teal-500 rounded-ee-[100px] rounded-es-[100px]
        shadow-md border border-t-0 border-teal-200 dark:border dark:border-t-0 dark:border-teal-500 dark:bg-teal-700 ${
          isArabic ? "rtl" : "ltr"
        }`}
      >
        <h1 className="text-5xl font-bold dark:text-teal-900 text-teal-200 mb-12 w-full sm:w-[70%] md:w-1/2 lg:w-[30%]">
          <motion.span
            variants={fedeInAnimationVariants1}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex justify-start"
          >
            {t("find")}
          </motion.span>
          <motion.span
            variants={fedeInAnimationVariants3}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex my-3 justify-center text-4xl"
          >
            {t("or")}
          </motion.span>
          <motion.span
            variants={fedeInAnimationVariants2}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex justify-end"
          >
            {t("offer")}
          </motion.span>
        </h1>

        <motion.p
          variants={fedeInAnimationVariants4}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-lg mt-12 mb-10 dark:text-teal-950 text-teal-700 pl-5"
        >
          {t("connect")}{" "}
          <span className="text-teal-100 font-semibold">{t("employees")}</span>{" "}
          {t("or")}{" "}
          <span className="text-teal-100 font-semibold">{t("cars")}</span>{" "}
          {t("or")}{" "}
          <span className="text-teal-100 font-semibold">{t("realEstate")}</span>{" "}
          {t("or")}{" "}
          <span className="text-teal-100 font-semibold">
            {t("electronics")}
          </span>
        </motion.p>
      </div>
    </div>
  );
};

export default Hero;
