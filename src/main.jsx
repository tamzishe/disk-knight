import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AlbumSearchPage from './pages/AlbumSearchPage.jsx'
import ArtistSearchPage from './pages/ArtistSearchPage.jsx'
import Home from './pages/Home.jsx'
import NotFound from './pages/NotFound.jsx';

const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFound />
  },
  { 
    path: '/', 
    element: <Home /> 
  },
  {
    path:'/album-search',
    element: <AlbumSearchPage/>,
    errorElement: <NotFound />,
  },
  {
    path: '/artist-search',
    element: <ArtistSearchPage/>,
    errorElement: <NotFound/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)