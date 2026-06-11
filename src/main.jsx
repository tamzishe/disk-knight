import React from "react";
import './index.css';
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AlbumSearchPage from "./pages/AlbumSearchPage.jsx";
import UserSearchPage from "./pages/UserSearchPage.jsx";
import CollectionPage from "./pages/CollectionPage.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import ListenedPage from "./pages/ListenedPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ListenLaterPage from "./pages/ListenLaterPage.jsx";
import WantPage from "./pages/WantPage.jsx";
import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./context/AuthContext";
import FollowPage from "./pages/FollowPage.jsx";

const buildRouter = (session) =>
	createBrowserRouter([
		{
			path: "/",
			element: session ? <Home /> : <LoginPage />,
		},
		{
			path: "/album-search",
			element: <AlbumSearchPage />,
			errorElement: <NotFound />,
		},
		{
			path: "/user-search",
			element: <UserSearchPage />,
			errorElement: <NotFound />,
		},
		{
			path: "/collection/:username",
			element: <CollectionPage />,
		},
		{
			path: "/listened/:username",
			element: <ListenedPage />,
		},
		{
			path: "/user/:username",
			element: <ProfilePage />,
		},
		{
			path: "/login",
			element: <LoginPage />,
		},
		{
			path: "/listen-later",
			element: <ListenLaterPage />,
		},
		{
			path: "/want",
			element: <WantPage />,
		},
		{
			path: "/user/:username/:type",
			element: <FollowPage />,
		},
		{
			path: "*",
			element: <NotFound />,
		},
	]);
function App() {
	const { session, loading } = useAuth();

	if (loading) return <div>Loading...</div>;

	return <RouterProvider router={buildRouter(session)} />;
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<AuthProvider>
			<App />
		</AuthProvider>
	</React.StrictMode>,
);
