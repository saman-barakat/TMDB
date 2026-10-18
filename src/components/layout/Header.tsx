import { useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchBar from "@/components/layout/SearchBar";
import { CloseIcon, SearchIcon } from "@/components/ui/icons";
import { navSections } from "@/config/navigation";
import { useHideOnScroll } from "@/hooks/useHideOnScroll";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const scrolledDown = useHideOnScroll();
  const hidden = scrolledDown && !menuOpen && !searchOpen;

  return (
    <header className={`app-header${hidden ? " app-header--hidden" : ""}`}>
      <Navbar
        expand="md"
        variant="dark"
        className="app-navbar"
        expanded={menuOpen}
        onToggle={setMenuOpen}
        onSelect={() => setMenuOpen(false)}
      >
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold">
            Movie Explorer
          </Navbar.Brand>

          <div className="ms-auto order-md-last d-flex align-items-center gap-2">
            <button
              type="button"
              className="icon-btn"
              aria-label={searchOpen ? "Close search" : "Open search"}
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen((open) => !open)}
            >
              {searchOpen ? <CloseIcon /> : <SearchIcon />}
            </button>
            <Navbar.Toggle aria-controls="main-nav" />
          </div>

          <Navbar.Collapse id="main-nav">
            <Nav className="me-auto">
              {navSections.map((section) => (
                <NavDropdown
                  key={section.id}
                  title={section.label}
                  id={`nav-${section.id}`}
                >
                  {section.items.map((item) => (
                    <NavDropdown.Item key={item.to} as={Link} to={item.to}>
                      {item.label}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {searchOpen && <SearchBar onClose={() => setSearchOpen(false)} />}
    </header>
  );
}
