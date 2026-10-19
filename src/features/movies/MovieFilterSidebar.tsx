import { useState } from "react";
import { Accordion, Button, Form } from "react-bootstrap";
import {
  SORT_OPTIONS,
  type MovieFilters,
  type MovieSort,
} from "@/features/movies/movieFilters";
import type { Genre } from "@/types/tmdb";

interface MovieFilterSidebarProps {
  genres: Genre[];
  initial: MovieFilters;
  defaults: MovieFilters;
  onApply: (filters: MovieFilters) => void;
}

export default function MovieFilterSidebar({
  genres,
  initial,
  defaults,
  onApply,
}: MovieFilterSidebarProps) {
  const [draft, setDraft] = useState<MovieFilters>(initial);

  const update = <K extends keyof MovieFilters>(
    key: K,
    value: MovieFilters[K],
  ) => setDraft((current) => ({ ...current, [key]: value }));

  const toggleGenre = (id: number) =>
    update(
      "genres",
      draft.genres.includes(id)
        ? draft.genres.filter((g) => g !== id)
        : [...draft.genres, id],
    );

  return (
    <Form
      aria-label="Movie filters"
      onSubmit={(event) => {
        event.preventDefault();
        onApply(draft);
      }}
    >
      <Accordion
        defaultActiveKey={["sort", "filters"]}
        alwaysOpen
        className="mb-3"
      >
        <Accordion.Item eventKey="sort">
          <Accordion.Header>Sort</Accordion.Header>
          <Accordion.Body>
            <Form.Label htmlFor="sort-by">Sort results by</Form.Label>
            <Form.Select
              id="sort-by"
              value={draft.sortBy}
              onChange={(event) =>
                update("sortBy", event.target.value as MovieSort)
              }
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="filters">
          <Accordion.Header>Filters</Accordion.Header>
          <Accordion.Body>
            <p className="fw-semibold mb-2">Genres</p>
            <div className="d-flex flex-wrap gap-2 mb-4">
              {genres.map((genre) => {
                const active = draft.genres.includes(genre.id);
                return (
                  <button
                    key={genre.id}
                    type="button"
                    className={`chip${active ? " is-active" : ""}`}
                    aria-pressed={active}
                    onClick={() => toggleGenre(genre.id)}
                  >
                    {genre.name}
                  </button>
                );
              })}
            </div>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="release-from">Released from</Form.Label>
              <Form.Control
                id="release-from"
                type="date"
                value={draft.releaseFrom}
                onChange={(event) => update("releaseFrom", event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="release-to">Released to</Form.Label>
              <Form.Control
                id="release-to"
                type="date"
                value={draft.releaseTo}
                onChange={(event) => update("releaseTo", event.target.value)}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label htmlFor="min-score">
                Minimum user score:{" "}
                {draft.minScore > 0
                  ? `${Math.round(draft.minScore * 10)}%`
                  : "any"}
              </Form.Label>
              <Form.Range
                id="min-score"
                min={0}
                max={10}
                step={0.5}
                value={draft.minScore}
                onChange={(event) =>
                  update("minScore", Number(event.target.value))
                }
              />
            </Form.Group>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="d-grid gap-2">
        <Button type="submit" variant="info" className="text-white fw-semibold">
          Search
        </Button>
        <Button
          type="button"
          variant="outline-secondary"
          onClick={() => {
            setDraft(defaults);
            onApply(defaults);
          }}
        >
          Reset filters
        </Button>
      </div>
    </Form>
  );
}
