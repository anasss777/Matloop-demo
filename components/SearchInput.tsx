import React from "react";

const SearchInput = () => {
  return (
    <div
      className={`flex flex-row justify-center items-center m-5 gap-2 rtl w-full sm:w-[70%] md:w-1/2 lg:w-[30%]`}
    >
      <input
        type="text"
        id="search"
        name="search"
        placeholder="بحث..."
        className={`flex justify-center mx-auto outline-1 outline-teal-400 rtl border border-teal-600 py-1 px-3 rounded-md w-full`}
      />
      <button
        className={`bg-teal-700 h-fit w-fit py-1 px-3 rounded-md text-teal-100 hover:bg-teal-700/80 transition duration-300 ease-linear
          cursor-pointer`}
      >
        بحث
      </button>
    </div>
  );
};

export default SearchInput;
