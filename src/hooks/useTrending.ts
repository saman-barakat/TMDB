import { useQuery } from "@tanstack/react-query";
import { trendingToSummary } from "@/api/mappers";
import { queryKeys } from "@/api/queryKeys";
import { getTrending } from "@/api/trending";
import type { MediaSummary } from "@/types/media";
import type { TimeWindow } from "@/types/tmdb";

export const useTrending = (timeWindow: TimeWindow) =>
  useQuery({
    queryKey: queryKeys.trending.all(timeWindow),
    queryFn: async () => {
      const { results } = await getTrending(timeWindow);
      return results
        .map(trendingToSummary)
        .filter((item): item is MediaSummary => item !== null);
    },
  });
