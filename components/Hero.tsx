"use client";

import {
  fedeInAnimationVariants1,
  fedeInAnimationVariants2,
  fedeInAnimationVariants3,
  fedeInAnimationVariants4,
} from "@/utils/animations";
import { motion } from "framer-motion";
import React from "react";

const Hero = () => {
  return (
    <div>
      <div className="w-full px-12 pb-5 pt-10 bg-teal-500 rounded-ee-[100px] border-t border-teal-200">
        <h1 className="text-5xl font-bold text-teal-200">
          <motion.span
            variants={fedeInAnimationVariants1}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex justify-start"
          >
            جد مطلوبك
          </motion.span>
          <motion.span
            variants={fedeInAnimationVariants3}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex my-3 justify-center text-4xl"
          >
            او
          </motion.span>
          <motion.span
            variants={fedeInAnimationVariants2}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex justify-end"
          >
            قدم ما لديك
          </motion.span>
        </h1>
        <motion.p
          variants={fedeInAnimationVariants4}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-lg mt-12 mb-10 text-teal-700 pl-5"
        >
          تواصل مع المستخدمين الباحثين عن{" "}
          <span className="text-teal-100 font-semibold">موظفين</span> او{" "}
          <span className="text-teal-100 font-semibold">سيارات</span> او{" "}
          <span className="text-teal-100 font-semibold">عقارات</span> او{" "}
          <span className="text-teal-100 font-semibold">أجهزة إلكترونية</span>
        </motion.p>
      </div>
    </div>
  );
};

export default Hero;
