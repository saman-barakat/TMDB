import FreeToWatchSection from "@/features/home/FreeToWatchSection";
import HeroSection from "@/features/home/HeroSection";
import PopularSection from "@/features/home/PopularSection";
import TrendingSection from "@/features/home/TrendingSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrendingSection />
      <PopularSection />
      <FreeToWatchSection />
    </>
  );
}
