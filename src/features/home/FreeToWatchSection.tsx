import { useState } from "react";
import MediaSection from "@/components/media/MediaSection";
import { useFreeToWatch } from "@/hooks/useFreeToWatch";
import type { MediaType } from "@/types/media";

const tabs: { value: MediaType; label: string }[] = [
  { value: "movie", label: "Movies" },
  { value: "tv", label: "TV" },
];

export default function FreeToWatchSection() {
  const [mediaType, setMediaType] = useState<MediaType>("movie");
  const { data, isPending, error } = useFreeToWatch(mediaType);

  return (
    <MediaSection
      title="Free to Watch"
      tabs={tabs}
      activeTab={mediaType}
      onTabChange={setMediaType}
      items={data}
      isPending={isPending}
      error={error}
    />
  );
}
