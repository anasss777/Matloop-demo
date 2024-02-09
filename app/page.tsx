import Image from "next/image";
import Jobs from "../components/CategoryCard";
import CategoryCard from "../components/CategoryCard";

export default function Home() {
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
    <main>
      {categoriesInfo.map((category, index) => (
        <CategoryCard
          key={index}
          categoryName={category.categoryName}
          imgSrc={category.imgSrc}
          pageHref={category.pageHref}
        />
      ))}
    </main>
  );
}
