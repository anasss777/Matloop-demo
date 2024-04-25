"use client";

import Overview from "@/components/Dashboard/Overview";
import { useLocale } from "next-intl";
import React from "react";

const Dashboard = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  return (
    <div
      className={`flex flex-col gap-10 w-full h-screen px-10 py-5 overflow-y-auto`}
    >
      <Overview />
    </div>
  );
};

export default Dashboard;
