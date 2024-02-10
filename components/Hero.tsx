import React from "react";

const Hero = () => {
  return (
    <div>
      <div className="w-full md:w-1/2 px-8 pb-5 pt-10 bg-teal-500 rounded-ee-[100px]">
        <h1 className="text-5xl font-bold text-teal-200">
          جد مطلوبك
          <span className="flex my-5 justify-center">او</span>
          <span className="flex justify-end">قدم ما لديك</span>
        </h1>
        <p className="text-lg mt-12 mb-10 text-teal-700 pl-5">
          تواصل مع المستخدمين الباحثين عن{" "}
          <span className="text-teal-100 font-semibold">موظفين</span> او{" "}
          <span className="text-teal-100 font-semibold">سيارات</span> او{" "}
          <span className="text-teal-100 font-semibold">عقارات</span> او{" "}
          <span className="text-teal-100 font-semibold">أجهزة إلكترونية</span>
        </p>
      </div>
    </div>
  );
};

export default Hero;
