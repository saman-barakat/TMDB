import { useState } from "react";
import MediaSection from "@/components/media/MediaSection";
import { usePopular } from "@/hooks/usePopular";
import type { PopularTab } from "@/types/media";

const tabs: { value: PopularTab; label: string }[] = [
  { value: "movies", label: "Movies" },
  { value: "tv", label: "TV Shows" },
  { value: "theatres", label: "In Theatres" },
  { value: "on-tv", label: "On TV" },
];

export default function PopularSection() {
  const [tab, setTab] = useState<PopularTab>("movies");
  const { data, isPending, error } = usePopular(tab);

  return (
    <MediaSection
      title="What's Popular"
      tabs={tabs}
      activeTab={tab}
      onTabChange={setTab}
      items={data}
      isPending={isPending}
      error={error}
    />
  );
}
