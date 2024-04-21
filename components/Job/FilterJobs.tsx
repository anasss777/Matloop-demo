"use client";

import { useLocale, useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { svgDown, svgFilter, svgTop } from "../svgsPath";
import JobType from "./JobType";
import JobLocation from "./JobLocation";
import EducationLevel from "./EducationLevel";
import Ranger from "../Cars/Ranger";
import CountriesSelector from "../CountriesSelector";

type Props = {
  onJobTypeChange: (type: string[]) => void;
  onJobLocationChange: (location: string[]) => void;
  onJobEducationChange: (education: string[]) => void;
  onMinSalaryChange: (minSalary: string) => void;
  onMaxSalaryChange: (maxSalary: string) => void;
  onCountryChange: (country: string) => void;
  onCityChange: (city: string) => void;
};

const FilterJobs = ({
  onJobTypeChange,
  onJobLocationChange,
  onJobEducationChange,
  onMinSalaryChange,
  onMaxSalaryChange,
  onCountryChange,
  onCityChange,
}: Props) => {
  const t = useTranslations("filters");
  const j = useTranslations("newJobPost");
  const locale = useLocale();
  const isArabic = locale === "ar";
  const [OpenType, setOpenType] = useState(false);
  const [OpenLocation, setOpenLocation] = useState(false);
  const [OpenEducation, setOpenEducation] = useState(false);
  const [OpenSalary, setOpenSalary] = useState(false);

  const [jobType, setJobType] = useState<string[]>([]);

  const [jobLocation, setJobLocation] = useState<string[]>([]);

  const [educationLevel, setEducationLevel] = useState<string[]>([]);

  const [minSalary, setMinSalary] = useState("0");
  const [maxSalary, setMaxSalary] = useState("1000000");

  const [selectedCountry, setSelectedCountry] = useState("");
  const [city, setCity] = useState("");

  const handleJobTypeChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setJobType((prevJobType) => [...prevJobType, value]);
      onJobTypeChange([...jobType, value]);
    } else {
      setJobType((prevJobType) => prevJobType.filter((type) => type !== value));
      onJobTypeChange(jobType.filter((type) => type !== value));
    }
  };

  const handleLocationChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (e.target.checked) {
      setJobLocation((prevJobLocation) => [...prevJobLocation, value]);
      onJobLocationChange([...jobLocation, value]);
    } else {
      setJobLocation((prevJobLocation) =>
        prevJobLocation.filter((type) => type !== value)
      );
      onJobLocationChange(jobLocation.filter((type) => type !== value));
    }
  };

  const handleEducationLevelChecked = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (e.target.checked) {
      setEducationLevel((prevEducationLevel) => [...prevEducationLevel, value]);
      onJobEducationChange([...educationLevel, value]);
    } else {
      setEducationLevel((prevEducationLevel) =>
        prevEducationLevel.filter((type) => type !== value)
      );
      onJobEducationChange(educationLevel.filter((type) => type !== value));
    }
  };

  const handleSalaryChange = () => {
    let minS = parseInt(minSalary);
    let maxS = parseInt(maxSalary);

    if (minS < 0) {
      alert("Minimum Salary cannot be less than 0");
      setMinSalary("0");
      onMinSalaryChange("0");
      minS = 0;
    }

    if (maxS > 1000000000) {
      alert("Maximum Salary cannot be greater than 1000000000");
      setMaxSalary("1000000000");
      onMaxSalaryChange("1000000000");
      maxS = 1000000000;
    }

    if (minS > maxS) {
      setMinSalary(maxS.toString());
      onMinSalaryChange(maxS.toString());
      minS = maxS;

      if (minS < 0) {
        setMinSalary("0");
        onMinSalaryChange("0");
        minS = 0;
      }
    }

    onMinSalaryChange(minS.toString());
    onMaxSalaryChange(maxS.toString());
  };

  const handleCountrySelected = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const countrySelected = e.target.value;
    setSelectedCountry(countrySelected);
    onCountryChange(countrySelected);
  };

  useEffect(() => {
    onCityChange(city);
  }, [city]);

  return (
    <div
      className={`bg-white h-fit w-full py-5 lg:rounded-xl lg:shadow-Card sticky top-14 mt-5 lg:border ${
        isArabic && "rtl text-right"
      }`}
    >
      <h1
        className={`flex flex-row items-center text-primary text-lg md:text-xl lg:text-xl font-bold px-5`}
      >
        {svgFilter}
        {t("filter")}
      </h1>

      <div className={`px-10`}>
        {/* Job type */}
        <p
          className={`flex flex-row justify-between items-center w-full p-2 border mt-8 text-primary text-base md:text-lg font-bold
          cursor-pointer rounded-md`}
          onClick={() => setOpenType(!OpenType)}
        >
          {j("jobType")}
          {OpenType ? svgTop : svgDown}
        </p>
        <div
          className={`px-3 -mt-5 transition-all duration-300 ease-linear border-x w-[95%] ${
            OpenType ? "h-full block" : "h-0 hidden"
          }`}
        >
          <JobType
            handleJobTypeChecked={handleJobTypeChecked}
            jobType={jobType}
          />
        </div>
        {/* Job location */}
        <p
          className={`flex flex-row justify-between items-center w-full p-2 border mt-8 text-primary text-base md:text-lg font-bold
          cursor-pointer rounded-md`}
          onClick={() => setOpenLocation(!OpenLocation)}
        >
          {j("location")}
          {OpenLocation ? svgTop : svgDown}
        </p>
        <div
          className={`px-3 -mt-5 transition-all duration-300 ease-linear border-x w-[95%] ${
            OpenLocation ? "h-full block" : "h-0 hidden"
          }`}
        >
          <JobLocation
            handleLocationChecked={handleLocationChecked}
            jobLocation={jobLocation}
          />
        </div>
        {/* Job education */}
        <p
          className={`flex flex-row justify-between items-center w-full p-2 border mt-8 text-primary text-base md:text-lg font-bold
          cursor-pointer rounded-md`}
          onClick={() => setOpenEducation(!OpenEducation)}
        >
          {j("educationLevel")}
          {OpenEducation ? svgTop : svgDown}
        </p>
        <div
          className={`px-3 -mt-5 transition-all duration-300 ease-linear border-x w-[95%] ${
            OpenEducation ? "h-full block" : "h-0 hidden"
          }`}
        >
          <EducationLevel
            handleEducationLevelChecked={handleEducationLevelChecked}
            educationLevel={educationLevel}
          />
        </div>
        {/* Job Salary */}
        <p
          className={`flex flex-row justify-between items-center w-full p-2 border mt-8 text-primary text-base md:text-lg font-bold
          cursor-pointer rounded-md`}
          onClick={() => setOpenSalary(!OpenSalary)}
        >
          {j("salaryRange")}
          {OpenSalary ? svgTop : svgDown}
        </p>
        <div
          className={`px-3 -mt-5 transition-all duration-300 ease-linear border-x w-[95%] ${
            OpenSalary ? "h-full block" : "h-0 hidden"
          }`}
        >
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
        </div>

        {/* Counrty and city */}
        <CountriesSelector
          handleCountrySelected={handleCountrySelected}
          city={city}
          setCity={setCity}
          selectedCountry={selectedCountry}
        />
      </div>
    </div>
  );
};

export default FilterJobs;
