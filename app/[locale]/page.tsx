import Categories from "@/components/Categories";
import Hero from "@/components/Hero";
import LatestDeals from "@/components/LatestDeals";
import TopDeals from "@/components/TopDeals";

export default function Home() {
  return (
    <main className="rtl px-2 md:px-10 lg:px-20">
      <Hero />
      <TopDeals />
      <Categories />
      <LatestDeals />
    </main>
  );
}
