import { env } from "@/config/env";

export type ImageSize =
  "w185" | "w342" | "w500" | "w780" | "w1280" | "original";

export const imageUrl = (
  path: string | null,
  size: ImageSize = "w500",
): string | null => (path ? `${env.tmdbImageBaseUrl}/${size}${path}` : null);
