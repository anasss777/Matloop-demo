"use locale";

import { JobPost } from "@/types/post";
import { useLocale, useTranslations } from "next-intl";
import React, { useState } from "react";
import { svgCloseDark } from "../svgsPath";
import JobType from "./JobType";
import JobLocation from "./JobLocation";
import EducationLevel from "./EducationLevel";
import Ranger from "../Cars/Ranger";
import CountriesSelector from "../CountriesSelector";
import Swal from "sweetalert2";
import { EditJobPost } from "@/utils/jobPost";

type Props = {
  openEditPost: boolean;
  setOpenEditPost: React.Dispatch<React.SetStateAction<boolean>>;
  post: JobPost;
};

const JobEditPost = ({ openEditPost, setOpenEditPost, post }: Props) => {
  const locale = useLocale();
  const isArabic = locale === "ar";
  const t = useTranslations("newJobPost");

  const [postTitle, setPostTitle] = useState(post.postTitle);

  const [jobType, setJobType] = useState(post.jobType);

  const [jobLocation, setJobLocation] = useState(post.jobLocation);

  const [educationLevel, setEducationLevel] = useState(post.educationLevel);

  const [minSalary, setMinSalary] = useState(String(post.salaryRange[0]));
  const [maxSalary, setMaxSalary] = useState(String(post.salaryRange[1]));

  const [selectedCountry, setSelectedCountry] = useState(
    post.address.split(", ")[0]
  );
  const [city, setCity] = useState(post.address.split(", ")[1]);

  const [description, setDescription] = useState(post.description);

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

  return (
    <div
      className={`flex flex-col justify-start items-center gap-1 bg-gray-200 dark:bg-gray-800 m-5 rounded-lg overflow-y-auto max-w-[400px]
      h-[90vh] w-full mx-auto p-2 ${isArabic && "rtl"}`}
    >
      <div className={`flex flex-col justify-center w-full`}>
        <button onClick={() => setOpenEditPost(!openEditPost)}>
          {svgCloseDark}
        </button>

        <div
          className={`flex flex-col justify-start items-center px-8 ${
            isArabic && "rtl"
          }`}
        >
          {/* Post title */}
          <h2 className={`text-primary text-lg font-bold mb-4 mt-20`}>
            {t("postTitle")}
          </h2>
          <input
            value={postTitle}
            placeholder={t("postTitlePlaceholder")}
            onChange={(e) => setPostTitle(e.target.value)}
            className={`border border-secondary/70 px-2 py-1 rounded-md w-full`}
          />

          {/* Job Type */}
          <h2 className={`text-primary text-lg font-bold mt-20`}>
            {t("jobType")}
          </h2>
          <JobType
            handleJobTypeChecked={handleJobTypeChecked}
            jobType={jobType}
          />

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
            className={`border border-secondary/70 px-2 py-1 rounded-md mb-20 w-full`}
          ></textarea>

          <div className={`flex flex-row gap-2 mb-10 ${!isArabic && "mb20"}`}>
            <button
              className={`btn2 bg-secondary shadow-lg`}
              onClick={() => {
                EditJobPost({
                  postId: post.postId,
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
                Swal.fire({
                  text: t("postEdited"),
                  icon: "success",
                  confirmButtonColor: "#4682b4",
                  confirmButtonText: t("ok"),
                }).then((result) => {
                  if (result.isConfirmed) {
                    setOpenEditPost(!openEditPost);
                  }
                });
              }}
            >
              {t("edit")}
            </button>

            <button
              onClick={() => setOpenEditPost(!openEditPost)}
              className={`btn2 bg-red-600 shadow-lg`}
            >
              {t("cancel")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobEditPost;
