import { describe, expect, it } from "vitest";
import { imageUrl } from "@/api/images";

describe("imageUrl", () => {
  it("builds a full image URL for the requested size", () => {
    expect(imageUrl("/abc.jpg", "w342")).toBe(
      "https://image.tmdb.org/t/p/w342/abc.jpg",
    );
  });

  it("returns null when there is no image", () => {
    expect(imageUrl(null)).toBeNull();
  });
});
