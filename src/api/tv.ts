import { apiClient } from "@/api/client";
import type { PaginatedResponse, TvShow } from "@/types/tmdb";

export type TvList = "popular" | "top_rated" | "airing_today" | "on_the_air";

export const getTv = async (
  list: TvList,
  page = 1,
): Promise<PaginatedResponse<TvShow>> => {
  const { data } = await apiClient.get<PaginatedResponse<TvShow>>(
    `/tv/${list}`,
    {
      params: { page },
    },
  );
  return data;
};
