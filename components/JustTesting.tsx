import React, { useState } from "react";

const JustTesting = () => {
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");

  return (
    <div className="flex flex-col items-center justify-start">
      <div className={`flex flex-col gap-2 justify-start`}>
        <span className={`flex justify-start text-secondary font-bold`}>
          {minValue} &nbsp; <span>Currency</span>
        </span>
        <input
          type="text"
          value={minValue}
          min={0}
          max={maxValue}
          onChange={(e) => setMinValue(e.target.value)}
          className="w-full border border-secondary/70 px-2 py-1 rounded-md"
        />
      </div>

      <div className={`flex flex-col gap-2 justify-start`}>
        <span className={`flex justify-start text-secondary font-bold`}>
          {maxValue} &nbsp; <span>Currency</span>
        </span>
        <input
          type="text"
          min={minValue}
          value={maxValue}
          onChange={(e) => setMaxValue(e.target.value)}
          className="w-full border border-secondary/70 px-2 py-1 rounded-md"
        />
      </div>
    </div>
  );
};

export default JustTesting;
