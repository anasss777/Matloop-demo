import AddNewMatloop from "@/components/AddNewMatloop";
import CarsDeals from "@/components/Cars/CarsDeals";
import Categories from "@/components/Categories";
import DevicesDeals from "@/components/ElectronicDevices/DevicesDeals";
import Hero from "@/components/Hero";
import JobsDeals from "@/components/Job/JobsDeals";
import LatestDeals from "@/components/LatestDeals";
import RealEstateDeals from "@/components/RealEstate/RealEstateDeals";
import TopDeals from "@/components/TopDeals";

export default function Home() {
  return (
    <main className="rtl px-2 md:px-10 lg:px-20">
      <Hero />
      {/* <TopDeals /> */}
      <Categories />
      <AddNewMatloop />
      {/* <LatestDeals /> */}
      <CarsDeals />
      <JobsDeals />
      <RealEstateDeals />
      <DevicesDeals />
    </main>
  );
}
