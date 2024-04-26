"use client";

import UsersList from "@/components/Dashboard/UsersList";
import { useLocale } from "next-intl";
import React from "react";

const Users = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div
      className={`flex flex-col gap-10 w-full h-screen px-10 pt-10 pb-5 overflow-y-auto`}
    >
      <UsersList />
    </div>
  );
};

export default Users;
