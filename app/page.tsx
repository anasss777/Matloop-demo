import Categories from "@/components/Categories";
import Hero from "@/components/Hero";
import LatestDeals from "@/components/LatestDeals";
import PostCard from "@/components/PostCard";
import SearchInput from "@/components/SearchInput";
import TopDeals from "@/components/TopDeals";

export default function Home() {
  return (
    <main className="rtl">
      <Hero />
      <SearchInput />
      <TopDeals />
      <Categories />
      <LatestDeals />
    </main>
  );
}
