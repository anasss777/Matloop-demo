import Image from "next/image";
import Link from "next/link";
import React from "react";
import SmallCard from "./SmallCard";

const deals = [
  "مبرمج",
  "مرسيدس 2018",
  "شقة لإيجار",
  "ايفون 15",
  "محاسب",
  "ساعة ذكية",
];

const TopDeals = () => {
  return (
    <div className="px-5 flex flex-col">
      <h1 className="text-xl mt-5 font-semibold text-[#4682b4] flex flex-row justify-between">
        <span>أهم الطلبات</span>{" "}
        <Link href="/" className="text-sm text-gray-400 font-normal underline">
          رؤية المزيد
        </Link>
      </h1>
      <div className="flex flex-row gap-2 py-2 h-20 w-full overflow-x-auto">
        {deals.map((deal, index) => (
          <SmallCard key={index} deal={deal} />
        ))}
      </div>
    </div>
  );
};

export default TopDeals;
