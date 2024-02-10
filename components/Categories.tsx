import React from "react";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  const categoriesInfo = [
    {
      categoryName: "وظائف",
      imgSrc: "/images/jobs.png",
      pageHref: "/jobs",
    },
    {
      categoryName: "سيارات",
      imgSrc: "/images/cars.png",
      pageHref: "/cars",
    },
    {
      categoryName: "عقارات",
      imgSrc: "/images/real-estate.png",
      pageHref: "/real-estate",
    },
    {
      categoryName: "إلكترونيات",
      imgSrc: "/images/electronic-devices.png",
      pageHref: "/electronic-devices",
    },
  ];
  return (
    <div>
      {categoriesInfo.map((category, index) => (
        <CategoryCard
          key={index}
          categoryName={category.categoryName}
          imgSrc={category.imgSrc}
          pageHref={category.pageHref}
        />
      ))}
    </div>
  );
};

export default Categories;
