import React from "react";

const SearchInput = () => {
  return (
    <div className={`flex flex-row justify-center items-center m-5 gap-2 rtl`}>
      <input
        type="text"
        id="search"
        name="search"
        placeholder="بحث..."
        className={`flex justify-center mx-auto outline-1 outline-gray-400 rtl border border-gray-600 py-2 px-3 rounded-md w-full`}
      />
      <button
        className={`bg-[#4682b4] h-fit w-fit py-2 px-3 rounded-md text-white hover:bg-[#4682b4]/80 transition duration-300 ease-linear
          cursor-pointer`}
      >
        بحث
      </button>
    </div>
  );
};

export default SearchInput;
