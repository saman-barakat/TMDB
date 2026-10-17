import { Placeholder } from "react-bootstrap";

export default function MediaCardSkeleton() {
  return (
    <div className="media-card" aria-hidden="true">
      <Placeholder as="div" animation="glow">
        <Placeholder className="media-card__skeleton-poster" />
      </Placeholder>
      <Placeholder as="p" animation="glow" className="mt-4 mb-1">
        <Placeholder xs={9} />
      </Placeholder>
      <Placeholder as="p" animation="glow">
        <Placeholder xs={5} />
      </Placeholder>
    </div>
  );
}
