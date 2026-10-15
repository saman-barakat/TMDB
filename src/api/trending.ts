import { apiClient } from "@/api/client";
import type { Movie, PaginatedResponse, TimeWindow } from "@/types/tmdb";

export const getTrendingMovies = async (
  timeWindow: TimeWindow = "week",
): Promise<PaginatedResponse<Movie>> => {
  const { data } = await apiClient.get<PaginatedResponse<Movie>>(
    `/trending/movie/${timeWindow}`,
  );
  return data;
};
