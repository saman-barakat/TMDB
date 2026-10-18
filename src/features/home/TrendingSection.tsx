import { useState } from "react";
import MediaSection from "@/components/media/MediaSection";
import { useTrending } from "@/hooks/useTrending";
import type { TimeWindow } from "@/types/tmdb";

const tabs: { value: TimeWindow; label: string }[] = [
  { value: "day", label: "Today" },
  { value: "week", label: "This Week" },
];

export default function TrendingSection() {
  const [timeWindow, setTimeWindow] = useState<TimeWindow>("day");
  const { data, isPending, error } = useTrending(timeWindow);

  return (
    <MediaSection
      title="Trending"
      tabs={tabs}
      activeTab={timeWindow}
      onTabChange={setTimeWindow}
      items={data}
      isPending={isPending}
      error={error}
    />
  );
}
