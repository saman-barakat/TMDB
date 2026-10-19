import { apiClient } from "@/api/client";
import type { Genre, GenreListResponse } from "@/types/tmdb";

export const getMovieGenres = async (): Promise<Genre[]> => {
  const { data } = await apiClient.get<GenreListResponse>("/genre/movie/list");
  return data.genres;
};
