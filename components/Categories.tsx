import React from "react";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const categoriesInfo = [
    {
      categoryName: "وظائف",
      imgSrc: "/images/jobsImg.png",
      pageHref: "/jobs",
    },
    {
      categoryName: "سيارات",
      imgSrc: "/images/carsImg.png",
      pageHref: "/cars",
    },
    {
      categoryName: "عقارات",
      imgSrc: "/images/realEstateImg.png",
      pageHref: "/real-estate",
    },
    {
      categoryName: "إلكترونيات",
      imgSrc: "/images/electronicDevicesImg.png",
      pageHref: "/electronic-devices",
    },
  ];

  return (
    <div className="flex flex-col">
      <p className="text-xl my-5 mr-5 font-semibold text-[#4682b4]">الأقسام</p>
      <div className="grid grid-rows-2 grid-cols-2 gap-6 lg:grid-rows-1 lg:grid-cols-4 justify-center mx-2">
        {categoriesInfo.map((category, index) => (
          <CategoryCard
            key={index}
            categoryName={category.categoryName}
            imgSrc={category.imgSrc}
            pageHref={category.pageHref}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
