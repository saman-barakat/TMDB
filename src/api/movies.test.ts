import { beforeEach, describe, expect, it, vi } from "vitest";
import { apiClient } from "@/api/client";
import { getMovies } from "@/api/movies";

vi.mock("@/api/client", () => ({ apiClient: { get: vi.fn() } }));

describe("getMovies", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("requests the right endpoint with the page and returns the data", async () => {
    const payload = {
      page: 2,
      results: [],
      total_pages: 10,
      total_results: 200,
    };
    vi.mocked(apiClient.get).mockResolvedValue({ data: payload } as never);

    const result = await getMovies("popular", 2);

    expect(apiClient.get).toHaveBeenCalledWith("/movie/popular", {
      params: { page: 2 },
    });
    expect(result).toEqual(payload);
  });
});
