// SearchInput.js
import { useLocale } from "next-intl";
import { useState } from "react";

type Props = {
  onSearchTermChange: (term: string) => void;
};

const SearchInput = ({ onSearchTermChange }: Props) => {
  const locale = useLocale();
  const isArabic = locale === "ar";

  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
    onSearchTermChange(e.target.value); // Call the function passed from parent with searchTerm
  };

  return (
    <div
      className={`flex flex-row justify-center items-center m-5 gap-2 rtl w-full sm:w-[70%] md:w-1/2 lg:w-[30%] ${
        isArabic ? "rtl" : "ltr"
      }`}
    >
      <input
        type="text"
        id="search"
        name="search"
        value={searchTerm}
        onChange={handleSearch}
        placeholder={`${isArabic ? "بحث..." : "Search..."}`}
        autoComplete="off"
        className={`flex justify-center mx-auto outline-1 outline-teal-400 rtl border border-teal-600 py-1 px-3 rounded-md w-full ${
          isArabic ? "rtl" : "ltr"
        }`}
      />
      <button
        className={`bg-teal-700 h-fit w-fit py-1 px-3 rounded-md text-teal-100 hover:bg-teal-700/80 transition duration-300 ease-linear
        cursor-pointer`}
      >
        {isArabic ? "بحث" : "Search"}
      </button>
    </div>
  );
};

export default SearchInput;
