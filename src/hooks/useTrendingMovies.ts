import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/api/queryKeys";
import { getTrendingMovies } from "@/api/trending";
import type { TimeWindow } from "@/types/tmdb";

export const useTrendingMovies = (timeWindow: TimeWindow = "week") =>
  useQuery({
    queryKey: queryKeys.trending.movies(timeWindow),
    queryFn: () => getTrendingMovies(timeWindow),
  });
