import { apiClient } from "@/api/client";
import type { PaginatedResponse, TimeWindow, TrendingItem } from "@/types/tmdb";

export const getTrending = async (
  timeWindow: TimeWindow = "day",
): Promise<PaginatedResponse<TrendingItem>> => {
  const { data } = await apiClient.get<PaginatedResponse<TrendingItem>>(
    `/trending/all/${timeWindow}`,
  );
  return data;
};
