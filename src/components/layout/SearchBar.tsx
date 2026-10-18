import { useState, type FormEvent, type KeyboardEvent } from "react";
import { Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface SearchBarProps {
  onClose: () => void;
}

export default function SearchBar({ onClose }: SearchBarProps) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    navigate(`/search?query=${encodeURIComponent(trimmed)}`);
    onClose();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Escape") onClose();
  };

  return (
    <div className="search-bar">
      <Container>
        <Form onSubmit={handleSubmit} onKeyDown={handleKeyDown} role="search">
          <Form.Control
            autoFocus
            type="search"
            className="search-bar__input"
            placeholder="Search for a movie, TV show, person..."
            aria-label="Search for a movie, TV show or person"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </Form>
      </Container>
    </div>
  );
}
