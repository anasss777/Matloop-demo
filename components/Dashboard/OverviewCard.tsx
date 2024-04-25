import React from "react";

type Props = {
  heading: string;
  title1: string;
  count1: number;
  title2: string;
  count2: number;
  title3: string;
  count3: number;
  title4: string;
  count4: number;
};

const OverviewCard = ({
  heading,
  title1,
  count1,
  title2,
  count2,
  title3,
  count3,
  title4,
  count4,
}: Props) => {
  return (
    <div className={`flex flex-col`}>
      <h1 className="text-xl font-bold mb-4 mt-10 text-primary">{heading}</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold">{title1}</h2>
          <p>{count1}</p>
        </div>
        <div className="p-4 border rounded-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold">{title2}</h2>
          <p>{count2}</p>
        </div>
        <div className="p-4 border rounded-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold">{title3}</h2>
          <p>{count3}</p>
        </div>
        <div className="p-4 border rounded-md dark:bg-gray-800">
          <h2 className="text-lg font-semibold">{title4}</h2>
          <p>{count4}</p>
        </div>
      </div>
    </div>
  );
};

export default OverviewCard;
