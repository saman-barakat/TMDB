export interface NavLinkItem {
  label: string;
  to: string;
}

export interface NavSection {
  id: string;
  label: string;
  items: NavLinkItem[];
}

export const navSections: NavSection[] = [
  {
    id: "movies",
    label: "Movies",
    items: [
      { label: "Popular", to: "/movie" },
      { label: "Now Playing", to: "/movie/now-playing" },
      { label: "Upcoming", to: "/movie/upcoming" },
      { label: "Top Rated", to: "/movie/top-rated" },
    ],
  },
  {
    id: "tv",
    label: "TV Shows",
    items: [
      { label: "Popular", to: "/tv" },
      { label: "Airing Today", to: "/tv/airing-today" },
      { label: "On TV", to: "/tv/on-the-air" },
      { label: "Top Rated", to: "/tv/top-rated" },
    ],
  },
  {
    id: "people",
    label: "People",
    items: [{ label: "Popular", to: "/person" }],
  },
];
