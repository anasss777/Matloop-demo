"use client";

import { useEffect, useState } from "react";
import firebase from "@/firebase";
import { useLocale, useTranslations } from "next-intl";
import OverviewCard from "./OverviewCard";

const Overview = () => {
  const t = useTranslations("overview");
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [totalJobsPosts, setTotalJobsPosts] = useState(0);
  const [totalJobsPostsToday, setTotalJobsPostsToday] = useState(0);
  const [activeJobsPosts, setActiveJobsPosts] = useState(0);
  const [resolvedJobsPosts, setResolvedJobsPosts] = useState(0);

  const [totalCarsPosts, setTotalCarsPosts] = useState(0);
  const [totalCarsPostsToday, setTotalCarsPostsToday] = useState(0);
  const [activeCarsPosts, setActiveCarsPosts] = useState(0);
  const [resolvedCarsPosts, setResolvedCarsPosts] = useState(0);

  const [totalRealEstatesPosts, setTotalRealEstatesPosts] = useState(0);
  const [totalRealEstatesPostsToday, setTotalRealEstatesPostsToday] =
    useState(0);
  const [activeRealEstatesPosts, setActiveRealEstatesPosts] = useState(0);
  const [resolvedRealEstatesPosts, setResolvedRealEstatesPosts] = useState(0);

  const [totalDevicesPosts, setTotalDevicesPosts] = useState(0);
  const [totalDevicesPostsToday, setTotalDevicesPostsToday] = useState(0);
  const [activeDevicesPosts, setActiveDevicesPosts] = useState(0);
  const [resolvedDevicesPosts, setResolvedDevicesPosts] = useState(0);

  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const today = firebase.firestore.Timestamp.fromDate(new Date());
      const startOfToday = new Date(today.toDate());
      startOfToday.setHours(0, 0, 0, 0);
      const endOfToday = new Date(today.toDate());
      endOfToday.setHours(23, 59, 59, 999);

      // Total cars and Total cars today
      const carsSnapshot = await db.collection("posts").get();
      setTotalCarsPosts(carsSnapshot.size);
      const carsSnapshotToday = await db
        .collection("posts")
        .where("createdAt", ">=", startOfToday)
        .where("createdAt", "<=", endOfToday)
        .get();
      setTotalCarsPostsToday(carsSnapshotToday.size);

      // Total jobs and Total cars today
      const jobsSnapshot = await db.collection("jobsPosts").get();
      setTotalJobsPosts(jobsSnapshot.size);
      const jobsSnapshotToday = await db
        .collection("jobsPosts")
        .where("createdAt", ">=", startOfToday)
        .where("createdAt", "<=", endOfToday)
        .get();
      setTotalJobsPostsToday(jobsSnapshotToday.size);

      // Total real estates and Total cars today
      const realEstateSnapshot = await db.collection("realEstatePosts").get();
      setTotalRealEstatesPosts(realEstateSnapshot.size);
      const realEstateSnapshotToday = await db
        .collection("realEstatePosts")
        .where("createdAt", ">=", startOfToday)
        .where("createdAt", "<=", endOfToday)
        .get();
      setTotalRealEstatesPostsToday(realEstateSnapshot.size);

      // Total devices and Total cars today
      const devicesSnapshot = await db.collection("electronicDevices").get();
      setTotalDevicesPosts(devicesSnapshot.size);
      const devicesSnapshotToday = await db
        .collection("electronicDevices")
        .where("createdAt", ">=", startOfToday)
        .where("createdAt", "<=", endOfToday)
        .get();
      setTotalDevicesPostsToday(devicesSnapshotToday.size);

      // Active and resolved jobs posts
      const activeJobsPostsSnapshot = await db
        .collection("jobsPosts")
        .where("status", "==", "active")
        .get();
      setActiveJobsPosts(activeJobsPostsSnapshot.size);

      const resolvedJobsPostsSnapshot = await db
        .collection("jobsPosts")
        .where("status", "==", "resolved")
        .get();
      setResolvedJobsPosts(resolvedJobsPostsSnapshot.size);

      // Active and resolved cars posts
      const activeCarsPostsSnapshot = await db
        .collection("posts")
        .where("status", "==", "active")
        .get();
      setActiveCarsPosts(activeCarsPostsSnapshot.size);

      const resolvedCarsPostsSnapshot = await db
        .collection("posts")
        .where("status", "==", "resolved")
        .get();
      setResolvedCarsPosts(resolvedCarsPostsSnapshot.size);

      // Active and resolved real estate posts
      const activeRealEstatesPostsSnapshot = await db
        .collection("realEstatePosts")
        .where("status", "==", "active")
        .get();
      setActiveRealEstatesPosts(activeRealEstatesPostsSnapshot.size);

      const resolvedRealEstatesPostsSnapshot = await db
        .collection("realEstatePosts")
        .where("status", "==", "resolved")
        .get();
      setResolvedRealEstatesPosts(resolvedRealEstatesPostsSnapshot.size);

      // Active and resolved devices posts
      const activeDevicesPostsSnapshot = await db
        .collection("electronicDevices")
        .where("status", "==", "active")
        .get();
      setActiveDevicesPosts(activeDevicesPostsSnapshot.size);

      const resolvedDevicesPostsSnapshot = await db
        .collection("electronicDevices")
        .where("status", "==", "resolved")
        .get();
      setResolvedDevicesPosts(resolvedDevicesPostsSnapshot.size);

      const usersSnapshot = await db.collection("profiles").get();
      setTotalUsers(usersSnapshot.size);
    };

    fetchData();
  }, []);

  const overviewData = [
    {
      heading: t("jobs"),
      title1: t("totalJobs"),
      count1: totalJobsPosts,
      title2: t("totalJobsToday"),
      count2: totalJobsPostsToday,
      title3: t("activeJobs"),
      count3: activeJobsPosts,
      title4: t("resolvedJobs"),
      count4: resolvedJobsPosts,
    },
    {
      heading: t("cars"),
      title1: t("totalCars"),
      count1: totalCarsPosts,
      title2: t("totalCarsToday"),
      count2: totalCarsPostsToday,
      title3: t("activeCars"),
      count3: activeCarsPosts,
      title4: t("resolvedCars"),
      count4: resolvedCarsPosts,
    },
    {
      heading: t("realEstate"),
      title1: t("totalRealEstates"),
      count1: totalRealEstatesPosts,
      title2: t("totalRealEstatesToday"),
      count2: totalRealEstatesPostsToday,
      title3: t("activeRealEstates"),
      count3: activeRealEstatesPosts,
      title4: t("resolvedRealEstates"),
      count4: resolvedRealEstatesPosts,
    },
    {
      heading: t("devices"),
      title1: t("totalDevices"),
      count1: totalDevicesPosts,
      title2: t("totalDevicesToday"),
      count2: totalDevicesPostsToday,
      title3: t("activeDevices"),
      count3: activeDevicesPosts,
      title4: t("resolvedDevices"),
      count4: resolvedDevicesPosts,
    },
  ];

  return (
    <div className={`py-10 px-2 ${isArabic && "rtl"}`}>
      <h1 className="text-3xl font-bold mb-4 text-secondary">
        {t("categories")}
      </h1>

      {/* Categories Overview */}
      {overviewData.map((data, index) => (
        <OverviewCard
          key={index}
          heading={data.heading}
          title1={data.title1}
          count1={data.count1}
          title2={data.title2}
          count2={data.count2}
          title3={data.title3}
          count3={data.count3}
          title4={data.title4}
          count4={data.count4}
        />
      ))}
    </div>
  );
};

export default Overview;
