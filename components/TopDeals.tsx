import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopDeals = () => {
  return (
    <div className="px-5 flex flex-col">
      <h1 className="text-xl mt-5 font-semibold text-[#4682b4] flex flex-row justify-between">
        <span>أهم الطلبات</span>{" "}
        <Link href="/" className="text-sm text-gray-400 font-normal underline">
          رؤية المزيد
        </Link>
      </h1>
      <div className="flex flex-row gap-2 py-2 pr-4 h-20 w-full mt-5 overflow-x-auto">
        <div className="min-w-36 h-12 shadow-Card border rounded-md flex items-center px-2">
          <Image src="/images/profile.png" alt={""} width={32} height={32} />
          <div className="flex flex-col">
            <p className="mr-1 text-sm text-teal-500 font-semibold">مطلوب</p>
            <p className="text-sm mr-1 text-gray-500">مبرمج</p>
          </div>
        </div>
        <div className="min-w-36 h-12 shadow-Card border rounded-md flex items-center px-2">
          <Image src="/images/profile.png" alt={""} width={32} height={32} />
          <div className="flex flex-col">
            <p className="mr-1 text-sm text-teal-500 font-semibold">مطلوب</p>
            <p className="text-sm mr-1 text-gray-500">مرسيدس 2018</p>
          </div>
        </div>
        <div className="min-w-36 h-12 shadow-Card border rounded-md flex items-center px-2">
          <Image src="/images/profile.png" alt={""} width={32} height={32} />
          <div className="flex flex-col">
            <p className="mr-1 text-sm text-teal-500 font-semibold">مطلوب</p>
            <p className="text-sm mr-1 text-gray-500">شقة لإيجار</p>
          </div>
        </div>
        <div className="min-w-36 h-12 shadow-Card border rounded-md flex items-center px-2">
          <Image src="/images/profile.png" alt={""} width={32} height={32} />
          <div className="flex flex-col">
            <p className="mr-1 text-sm text-teal-500 font-semibold">مطلوب</p>
            <p className="text-sm mr-1 text-gray-500">ايفون 15</p>
          </div>
        </div>
        <div className="min-w-36 h-12 shadow-Card border rounded-md flex items-center px-2">
          <Image src="/images/profile.png" alt={""} width={32} height={32} />
          <div className="flex flex-col">
            <p className="mr-1 text-sm text-teal-500 font-semibold">مطلوب</p>
            <p className="text-sm mr-1 text-gray-500">محاسب</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopDeals;
