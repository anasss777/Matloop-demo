import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div
      className={`flex flex-col justify-center items-center w-full h-fit py-3 bg-teal-500`}
    >
      <Link href="/">
        <p className={`flex justify-center items-center text-4xl text-white`}>
          مطلوب
        </p>
      </Link>
    </div>
  );
};

export default Header;
