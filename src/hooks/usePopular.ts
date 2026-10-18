import { useQuery } from "@tanstack/react-query";
import { movieToSummary, tvToSummary } from "@/api/mappers";
import { getMovies } from "@/api/movies";
import { queryKeys } from "@/api/queryKeys";
import { getTv } from "@/api/tv";
import type { MediaSummary, PopularTab } from "@/types/media";

const fetchers: Record<PopularTab, () => Promise<MediaSummary[]>> = {
  movies: async () => (await getMovies("popular")).results.map(movieToSummary),
  tv: async () => (await getTv("popular")).results.map(tvToSummary),
  theatres: async () =>
    (await getMovies("now_playing")).results.map(movieToSummary),
  "on-tv": async () => (await getTv("on_the_air")).results.map(tvToSummary),
};

export const usePopular = (tab: PopularTab) =>
  useQuery({ queryKey: queryKeys.popular(tab), queryFn: fetchers[tab] });
