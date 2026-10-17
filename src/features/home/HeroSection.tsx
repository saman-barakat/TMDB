import { useEffect, useState, type FormEvent } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { imageUrl } from "@/api/images";
import { useTrending } from "@/hooks/useTrending";

const SLIDE_COUNT = 8;
const ROTATE_MS = 6000;

export default function HeroSection() {
  const navigate = useNavigate();
  const { data } = useTrending("day");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const backdrops = (data ?? [])
    .map((item) => imageUrl(item.backdropPath, "w1280"))
    .filter((url): url is string => url !== null)
    .slice(0, SLIDE_COUNT);

  useEffect(() => {
    if (backdrops.length < 2) return;
    const id = window.setInterval(() => {
      setActive((current) => (current + 1) % backdrops.length);
    }, ROTATE_MS);
    return () => window.clearInterval(id);
  }, [backdrops.length]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed) navigate(`/search?query=${encodeURIComponent(trimmed)}`);
  };

  return (
    <section className="hero">
      {backdrops.map((url, index) => (
        <div
          key={url}
          className={`hero__slide${index === active ? " is-active" : ""}`}
          style={{ backgroundImage: `url(${url})` }}
        />
      ))}
      <div className="hero__overlay" />
      <Container className="hero__content py-5">
        <div className="py-4">
          <h1 className="display-4 fw-bold mb-0">Welcome.</h1>
          <p className="fs-3 fw-semibold mb-4">
            Millions of movies, TV shows and people to discover. Explore now.
          </p>
          <Form onSubmit={handleSubmit} role="search">
            <InputGroup size="lg">
              <Form.Control
                type="search"
                placeholder="Search for a movie, TV show, person..."
                aria-label="Search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
              <Button
                type="submit"
                variant="info"
                className="text-white fw-semibold"
              >
                Search
              </Button>
            </InputGroup>
          </Form>
        </div>
      </Container>
    </section>
  );
}
