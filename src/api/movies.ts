import { apiClient } from "@/api/client";
import type { Movie, PaginatedResponse } from "@/types/tmdb";

export type MovieList = "popular" | "top_rated" | "upcoming" | "now_playing";

export const getMovies = async (
  list: MovieList,
  page = 1,
): Promise<PaginatedResponse<Movie>> => {
  const { data } = await apiClient.get<PaginatedResponse<Movie>>(
    `/movie/${list}`,
    {
      params: { page },
    },
  );
  return data;
};
