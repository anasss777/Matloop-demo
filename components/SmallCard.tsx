import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  deal: string;
};

const SmallCard = ({ deal }: Props) => {
  return (
    <Link
      href="/"
      className="min-w-36 h-12 shadow-Card border rounded-md flex items-center px-2"
    >
      <Image src="/images/profile.png" alt={""} width={32} height={32} />
      <div className="flex flex-col">
        <p className="mr-1 text-sm text-teal-500 font-semibold">مطلوب</p>
        <p className="text-sm mr-1 text-gray-500">{deal}</p>
      </div>
    </Link>
  );
};

export default SmallCard;
