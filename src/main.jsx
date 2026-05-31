import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AlbumSearchPage from "./pages/AlbumSearchPage.jsx";
import ArtistSearchPage from "./pages/ArtistSearchPage.jsx";
import CollectionPage from "./pages/CollectionPage.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import ListenedPage from "./pages/ListenedPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/album-search",
    element: <AlbumSearchPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/artist-search",
    element: <ArtistSearchPage />,
    errorElement: <NotFound />,
  },
  {
    path: '/collection/:username',
    element: <CollectionPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
  { 
    path: '/listened/:username', 
    element: <ListenedPage /> 
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
