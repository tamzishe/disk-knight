import { useState, useEffect } from "react";
import AlbumCard from "../components/AlbumCard/AlbumCard";
import AlbumModal from "../components/AlbumModal/AlbumModal";
import HomeButton from "../components/Buttons/HomeButton";
import BackButton from "../components/Buttons/BackButton";
import styles from "../css/ListenLaterPage.module.css";
import {
	handleCollect,
	handleListen,
	handleListenLater,
	handleWant,
} from "../func/handlers.js";
import { getListenLater, isInListenLater } from "../supabase/listenLater.js";
import { isInCollection } from "../supabase/collection.js";
import { isListened } from "../supabase/listened.js";
import { useAuth } from "../context/AuthContext";
import { getRatingsForUser } from "../supabase/ratings.js";
import { getRatingByLabel } from "../func/ratings.js";
import { isInWant } from "../supabase/want.js";
import SortBar from "../components/SortBar/SortBar.jsx";
import Header from '../components/Header/Header';

export default function ListenLaterPage() {
	const { user } = useAuth();
	const [listenLater, setListenLater] = useState([]);
	const [selectedAlbum, setSelectedAlbum] = useState(null);
	const [collected, setCollected] = useState(false);
	const [listenedState, setListenedState] = useState(false);
	const [ratings, setRatings] = useState({});
	const [sortBy, setSortBy] = useState("date");
	const [wantedState, setWantedState] = useState(false);
	const [listenLaterState, setListenLaterState] = useState(false);
	const [statusMessage, setStatusMessage] = useState(null);

	useEffect(() => {
		async function loadListenLater() {
			const data = await getListenLater(user.id);
			setListenLater(data);
			const ratingsMap = await getRatingsForUser(user.id);
			setRatings(ratingsMap);
		}
		loadListenLater();
	}, [user.id]);

	const handleSelectAlbum = async (album) => {
		setSelectedAlbum(album);
		setCollected(await isInCollection(user.id, album.id));
		setListenedState(await isListened(user.id, album.id));
		setListenLaterState(await isInListenLater(user.id, album.id));
		setWantedState(await isInWant(user.id, album.id));
	};

	const refreshListenLater = async () => {
		const data = await getListenLater(user.id);
		setListenLater(data);
	};

	const refreshRatings = async () => {
		const ratingsMap = await getRatingsForUser(user.id);
		setRatings(ratingsMap);
	};

	const ratingValues = {
		Perfect: 10,
		Excellent: 9,
		Amazing: 8,
		Great: 7,
		Good: 6,
		Mid: 5,
		Bad: 0,
	};
	const sorted = [...listenLater].sort((a, b) => {
		if (sortBy === "date")
			return new Date(b.time_added) - new Date(a.time_added);
		if (sortBy === "title") return a.title.localeCompare(b.title);
		if (sortBy === "rating")
			return (
				(ratingValues[ratings[b.id]] || -1) -
				(ratingValues[ratings[a.id]] || -1)
			);
	});

	return (
		<div className="page">
			<Header />
			<BackButton />
			<h1>Listen Later</h1>
			<SortBar sortBy={sortBy} setSortBy={setSortBy} />
			{listenLater.length === 0 && <p>Nothing here yet!</p>}
			<div className={"albumList"}>
				{sorted.map((album) => (
					<AlbumCard
						key={album.id}
						title={album.title}
						cover={album.cover}
						albumId={album.id}
						rating={
							ratings[album.id]
								? getRatingByLabel(ratings[album.id])
								: null
						}
						onClick={() => handleSelectAlbum(album)}
					/>
				))}
			</div>
			{selectedAlbum && (
				<AlbumModal
					album={selectedAlbum}
					onCollect={async () =>
						await handleCollect(
							user.id,
							selectedAlbum,
							(message) => {
								if (message) {
									setStatusMessage(message);
									setTimeout(
										() => setStatusMessage(null),
										4000,
									);
								}
								setSelectedAlbum(null);
							},
						)
					}
					onListen={async () =>
						await handleListen(
							user.id,
							selectedAlbum,
							(message) => {
								if (message) {
									setStatusMessage(message);
									setTimeout(
										() => setStatusMessage(null),
										4000,
									);
								}
								setSelectedAlbum(null);
							},
						)
					}
					onListenLater={async () =>
						await handleListenLater(
							user.id,
							selectedAlbum,
							async (message) => {
								if (message) {
									setStatusMessage(message);
									setTimeout(
										() => setStatusMessage(null),
										4000,
									);
								}
								await refreshListenLater();
								setSelectedAlbum(null);
							},
						)
					}
					onWant={async () =>
						await handleWant(user.id, selectedAlbum, (message) => {
							if (message) {
								setStatusMessage(message);
								setTimeout(() => setStatusMessage(null), 4000);
							}
							setSelectedAlbum(null);
						})
					}
					onRate={() => {
						refreshRatings();
						setSelectedAlbum({ ...selectedAlbum });
					}}
					onClose={() => setSelectedAlbum(null)}
					isCollected={collected}
					isListened={listenedState}
					isListenLater={listenLaterState}
					isWanted={wantedState}
				/>
			)}
			{statusMessage && (
				<div onClick={() => setStatusMessage(null)}>
					{statusMessage}
				</div>
			)}
		</div>
	);
}
