import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import HomePage from "@/pages/HomePage";
import MovieListPage from "@/pages/MovieListPage";
import NotFoundPage from "@/pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "movie", element: <MovieListPage category="popular" /> },
      {
        path: "movie/now-playing",
        element: <MovieListPage category="now-playing" />,
      },
      {
        path: "movie/upcoming",
        element: <MovieListPage category="upcoming" />,
      },
      {
        path: "movie/top-rated",
        element: <MovieListPage category="top-rated" />,
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
