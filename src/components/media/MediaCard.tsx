import { Link } from "react-router-dom";
import { imageUrl } from "@/api/images";
import type { MediaSummary } from "@/types/media";

const formatDate = (value: string): string => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
};

const ratingLevel = (percent: number): "high" | "mid" | "low" | "none" => {
  if (percent <= 0) return "none";
  if (percent >= 70) return "high";
  if (percent >= 40) return "mid";
  return "low";
};

export default function MediaCard({ item }: { item: MediaSummary }) {
  const poster = imageUrl(item.posterPath, "w342");
  const to = `/${item.mediaType}/${item.id}`;
  const percent = Math.round(item.voteAverage * 10);

  return (
    <article className="media-card">
      <div className="media-card__poster-wrap">
        <Link to={to} aria-hidden="true" tabIndex={-1}>
          {poster ? (
            <img
              className="media-card__poster"
              src={poster}
              alt=""
              loading="lazy"
            />
          ) : (
            <div className="media-card__no-image" />
          )}
        </Link>
        <div
          className={`media-card__rating media-card__rating--${ratingLevel(percent)}`}
          aria-label={percent > 0 ? `User score ${percent}%` : "Not rated"}
        >
          {percent > 0 ? (
            <>
              {percent}
              <sup>%</sup>
            </>
          ) : (
            "NR"
          )}
        </div>
      </div>
      <h3 className="media-card__title">
        <Link to={to}>{item.title}</Link>
      </h3>
      <p className="media-card__date">{formatDate(item.releaseDate)}</p>
    </article>
  );
}
