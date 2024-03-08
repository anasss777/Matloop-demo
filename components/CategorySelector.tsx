import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  handleCategorySelected: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedCategory: string;
};

const CategorySelector = ({
  handleCategorySelected,
  selectedCategory,
}: Props) => {
  const t = useTranslations("newPost");
  const router = useRouter();

  if (selectedCategory === "cars") {
    router.push("/new-matloop/car");
  } else if (selectedCategory === "jobs") {
    router.push("/new-matloop/job");
  } else if (selectedCategory === "realEstates") {
    router.push("/new-matloop/real-estate");
  } else if (selectedCategory === "electronics") {
    router.push("/new-matloop/electronic-device");
  }

  return (
    <div>
      {/* Choose category */}
      <select
        onChange={handleCategorySelected}
        name="categories"
        id="categories"
        className={`bg-primary rounded-md px-2 mt-10 text-white`}
      >
        <option value="" selected disabled hidden>
          {t("chooseCategory")}
        </option>
        <option className={`bg-white text-black`} value="cars">
          {t("cars")}
        </option>
        <option className={`bg-white text-black`} value="jobs">
          {t("jobs")}
        </option>
        <option className={`bg-white text-black`} value="realEstates">
          {t("realEstates")}
        </option>
        <option className={`bg-white text-black`} value="electronics">
          {t("electronics")}
        </option>
      </select>
    </div>
  );
};

export default CategorySelector;
