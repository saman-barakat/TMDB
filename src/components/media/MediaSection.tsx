import { Alert, Container } from "react-bootstrap";
import MediaCard from "@/components/media/MediaCard";
import MediaCardSkeleton from "@/components/media/MediaCardSkeleton";
import SegmentedToggle from "@/components/ui/SegmentedToggle";
import type { MediaSummary } from "@/types/media";

interface Tab<T extends string> {
  value: T;
  label: string;
}

interface MediaSectionProps<T extends string> {
  title: string;
  tabs: Tab<T>[];
  activeTab: T;
  onTabChange: (value: T) => void;
  items: MediaSummary[] | undefined;
  isPending: boolean;
  error: Error | null;
}

export default function MediaSection<T extends string>({
  title,
  tabs,
  activeTab,
  onTabChange,
  items,
  isPending,
  error,
}: MediaSectionProps<T>) {
  return (
    <section className="py-4">
      <Container>
        <div className="d-flex flex-wrap align-items-center gap-3 mb-3">
          <h2 className="h4 fw-semibold mb-0">{title}</h2>
          <SegmentedToggle
            label={`${title} filter`}
            options={tabs}
            value={activeTab}
            onChange={onTabChange}
          />
        </div>

        {error ? (
          <Alert variant="danger">{error.message}</Alert>
        ) : isPending ? (
          <div className="media-scroller">
            {Array.from({ length: 8 }, (_, index) => (
              <MediaCardSkeleton key={index} />
            ))}
          </div>
        ) : items && items.length > 0 ? (
          <div className="media-scroller">
            {items.map((item) => (
              <MediaCard key={`${item.mediaType}-${item.id}`} item={item} />
            ))}
          </div>
        ) : (
          <p className="text-muted">Nothing to show right now.</p>
        )}
      </Container>
    </section>
  );
}
