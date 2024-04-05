"use client";

import Ranger from "@/components/Cars/Ranger";
import CategorySelector from "@/components/CategorySelector";
import CountriesSelector from "@/components/CountriesSelector";
import EducationLevel from "@/components/Job/EducationLevel";
import JobLocation from "@/components/Job/JobLocation";
import JobType from "@/components/Job/JobType";
import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import firebase from "@/firebase";
import { useRouter } from "next/navigation";
import { addJobPost } from "@/utils/jobPost";
import { svgLoading } from "@/components/svgsPath";

const Job = () => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("newJobPost");
  const [poster, setPoster] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const [postTitle, setPostTitle] = useState("");

  const [jobType, setJobType] = useState<string[]>([]);

  const [jobLocation, setJobLocation] = useState<string[]>([]);

  const [educationLevel, setEducationLevel] = useState<string[]>([]);

  const [minSalary, setMinSalary] = useState("100000");
  const [maxSalary, setMaxSalary] = useState("100000");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [city, setCity] = useState("");

  const [description, setDescription] = useState("");

  const handleJobTypeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setJobType((prevJobType) => [...prevJobType, value]);
    } else {
      setJobType((prevJobType) => prevJobType.filter((type) => type !== value));
    }
  };

  const handleLocationChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setJobLocation((prevJobLocation) => [...prevJobLocation, value]);
    } else {
      setJobLocation((prevJobLocation) =>
        prevJobLocation.filter((type) => type !== value)
      );
    }
  };

  const handleEducationLevelChecked = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (e.target.checked) {
      setEducationLevel((prevEducationLevel) => [...prevEducationLevel, value]);
    } else {
      setEducationLevel((prevEducationLevel) =>
        prevEducationLevel.filter((type) => type !== value)
      );
    }
  };

  const handleSalaryChange = () => {
    let minS = parseInt(minSalary);
    let maxS = parseInt(maxSalary);

    if (minS < 0) {
      alert("Minimum Salary cannot be less than 0");
      setMinSalary("0");
      minS = 0;
    }

    if (maxS > 1000000000) {
      alert("Maximum Salary cannot be greater than 1000000000");
      setMaxSalary("1000000000");
      maxS = 1000000000;
    }

    if (minS > maxS) {
      setMinSalary(maxS.toString());
      minS = maxS;

      if (minS < 0) {
        setMinSalary("0");
        minS = 0;
      }
    }
  };

  const handleCountrySelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
  };

  useEffect(() => {
    // Simulate a 2-second loading delay
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    // Clear the timer if the component unmounts
    return () => clearTimeout(loadingTimer);
  }, []);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const docRef = firebase
          .firestore()
          .collection("profiles")
          .doc(user.uid);
        docRef
          .get()
          .then((doc) => {
            if (doc.exists) {
              setPoster(doc.data());
            } else {
              console.log("No such document!");
            }
          })
          .catch((error) => {
            console.log("Error getting document:", error);
          });
      } else {
        router.push("/sign-up");
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  return (
    <div
      className={`flex flex-col justify-center items-center px-8 ${
        isArabic && "rtl"
      }`}
    >
      {/* Choose category */}
      <CategorySelector />

      {/* Post title */}
      <h2 className={`text-primary text-lg font-bold mb-4 mt-20`}>
        {t("postTitle")}
      </h2>
      <input
        value={postTitle}
        placeholder={t("postTitlePlaceholder")}
        onChange={(e) => setPostTitle(e.target.value)}
        className={`border border-secondary/70 px-2 py-1 rounded-md w-full sm:w-[70%] md:w-[50%] lg:w-[30%]`}
      />

      {/* Job Type */}
      <h2 className={`text-primary text-lg font-bold mt-20`}>{t("jobType")}</h2>
      <JobType handleJobTypeChecked={handleJobTypeChecked} jobType={jobType} />

      {/* Job location */}
      <h2 className={`text-primary text-lg font-bold mt-20`}>
        {t("location")}
      </h2>
      <JobLocation
        handleLocationChecked={handleLocationChecked}
        jobLocation={jobLocation}
      />

      {/* Education level */}
      <h2 className={`text-primary text-lg font-bold mt-20`}>
        {t("educationLevel")}
      </h2>
      <EducationLevel
        handleEducationLevelChecked={handleEducationLevelChecked}
        educationLevel={educationLevel}
      />

      {/* Price Range */}
      <h2 className={`text-primary text-lg font-bold mt-20`}>
        {t("salaryRange")}
      </h2>
      <Ranger
        minValue={minSalary}
        maxValue={maxSalary}
        setMinValue={setMinSalary}
        setMaxValue={setMaxSalary}
        min="0"
        max="1000000000"
        handleInputChange={handleSalaryChange}
        currency
      />

      {/* Select Country */}
      <CountriesSelector
        handleCountrySelected={handleCountrySelected}
        city={city}
        setCity={setCity}
        selectedCountry={selectedCountry}
      />

      {/* Other Specs */}
      <h2 className={`text-primary text-lg font-bold mb-4 mt-20`}>
        {t("jobDetails")}
      </h2>
      <textarea
        id="description"
        name="description"
        rows={4}
        cols={50}
        placeholder={t("description")}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className={`border border-secondary/70 px-2 py-1 rounded-md mb-20 w-full sm:w-[70%] md:w-[50%] lg:w-[30%]`}
      ></textarea>

      <button
        className={`btn2 bg-secondary mb-20`}
        onClick={() => {
          addJobPost({
            poster,
            postTitle,
            jobType,
            jobLocation,
            educationLevel,
            minSalary,
            maxSalary,
            selectedCountry,
            city,
            description,
          });
          !isLoading && router.push("/jobs");
        }}
      >
        {isLoading ? (
          <span className={`flex flex-row items-center gap-1`}>
            {t("loading")} {svgLoading}
          </span>
        ) : (
          <span className={`flex flex-row items-center gap-1`}>
            {t("submit")}
          </span>
        )}
      </button>
    </div>
  );
};

export default Job;
