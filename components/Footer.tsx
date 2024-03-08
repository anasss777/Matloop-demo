import Link from "next/link";
import React from "react";

const Footer = () => {
  const todayYear = new Date().getFullYear();

  return (
    <div className="flex flex-col gap-6 bg-teal-400 pt-4 px-3 mt-10">
      <Link href="/" className={`flex justify-center w-full`}>
        <p
          className={`flex justify-center items-center text-2xl text-white w-fit`}
        >
          مطلوب
        </p>
      </Link>

      <div>
        <p className="flex justify-center font-bold text-teal-700">
          البريد الإلكتروني
        </p>
        <p className="flex justify-center text-teal-100 text-sm">
          info@matloob.com
        </p>
        <p className="flex justify-center font-bold text-teal-700">
          رقم الهاتف
        </p>
        <p className="flex justify-center text-teal-100 text-sm">
          +901234567890
        </p>
        <p className="flex justify-center font-bold text-teal-700">العنوان</p>
        <p className="flex justify-center text-teal-100 text-sm text-center">
          8228 Imam Ali Road, Riyadh 12345-6789, Saudi Arabia
        </p>
      </div>

      <p
        className={`flex justify-center text-white mx-auto rtl bg-primary/80 pb-1 w-full text-sm font-light`}
      >
        تصميم و تطوير
        <Link href="/" className={`text-teal-700 font-normal`}>
          &nbsp;Applai Technology&nbsp;
        </Link>
        {todayYear}©
      </p>
    </div>
  );
};

export default Footer;
