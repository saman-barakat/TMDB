import { useQuery } from "@tanstack/react-query";
import { discoverFreeMovies, discoverFreeTv } from "@/api/discover";
import { movieToSummary, tvToSummary } from "@/api/mappers";
import { queryKeys } from "@/api/queryKeys";
import type { MediaType } from "@/types/media";

export const useFreeToWatch = (mediaType: MediaType) =>
  useQuery({
    queryKey: queryKeys.freeToWatch(mediaType),
    queryFn: async () =>
      mediaType === "movie"
        ? (await discoverFreeMovies()).results.map(movieToSummary)
        : (await discoverFreeTv()).results.map(tvToSummary),
  });
