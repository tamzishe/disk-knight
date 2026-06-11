import { useState, useEffect } from "react";
import { getCollection, isInCollection } from "../supabase/collection.js";
import { isListened } from "../supabase/listened.js";
import AlbumCard from "../components/AlbumCard/AlbumCard";
import AlbumModal from "../components/AlbumModal/AlbumModal";
import HomeButton from "../components/Buttons/HomeButton";
import styles from "../css/CollectionPage.module.css";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getRatingsForUser } from "../supabase/ratings.js";
import { getRatingByLabel } from "../func/ratings.js";
import { getUserProfile } from "../supabase/users.js";
import SortBar from "../components/SortBar/SortBar.jsx";
import { handleListenLater, handleWant, handleCollect, handleListen } from "../func/handlers.js";
import { isInListenLater } from "../supabase/listenLater.js";
import { isInWant } from "../supabase/want.js";
import Header from '../components/Header/Header';
import BackButton from "../components/Buttons/BackButton";

export default function CollectionPage() {
	const { user } = useAuth();
	const [collection, setCollection] = useState([]);
	const [selectedAlbum, setSelectedAlbum] = useState(null);
	const [collected, setCollected] = useState(false);
	const [listenedState, setListenedState] = useState(false);
	const [listenLaterState, setListenLaterState] = useState(false);
	const [wantedState, setWantedState] = useState(false);
	const [sortBy, setSortBy] = useState("date");
	const [ratings, setRatings] = useState({});
	const { username: profileUsername } = useParams();
	const [currentProfile, setCurrentProfile] = useState(null);
	const [statusMessage, setStatusMessage] = useState(null);

	useEffect(() => {
		async function loadProfile() {
			const currentProfile = await getUserProfile(profileUsername);
			setCurrentProfile(currentProfile);
			console.log("currentProfile:", currentProfile);
		}
		loadProfile();
	}, [profileUsername]);

	useEffect(() => {
		async function loadCollection() {
			if (!currentProfile) return; // guard
			const data = await getCollection(currentProfile.id);
			setCollection(data);
			const ratingsMap = await getRatingsForUser(currentProfile.id);
			setRatings(ratingsMap);
		}
		loadCollection();
	}, [currentProfile]);

	const handleSelectAlbum = async (album) => {
		setSelectedAlbum(album);
		setCollected(await isInCollection(user.id, album.id)); // this is for the current user
		setListenedState(await isListened(user.id, album.id));
		setListenLaterState(await isInListenLater(user.id, album.id));
		setWantedState(await isInWant(user.id, album.id));
	};

	const refreshCollection = async () => {
		// if on own page
		const data = await getCollection(user.id);
		setCollection(data);
	};
	const refreshRatings = async () => {
		// if on own page
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

	const sorted = [...collection].sort((a, b) => {
		if (sortBy === "date")
			return new Date(b.time_added) - new Date(a.time_added);
		if (sortBy === "title") return a.title.localeCompare(b.title);
		if (sortBy === "rating")
			return (
				(ratingValues[ratings[b.id]] || -1) -
				(ratingValues[ratings[a.id]] || -1)
			);
	});

	if (!currentProfile) return null;
	return (
		<div className="page">
			<Header />
			<BackButton />
			<h2>{currentProfile?.username || profileUsername}'s Collection</h2>
			<SortBar sortBy={sortBy} setSortBy={setSortBy} />
			{collection.length === 0 && (
				<p>No albums in your collection yet!</p>
			)}
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
							async (message) => {
								if (message) {
									setStatusMessage(message);
									setTimeout(() => setStatusMessage(null), 4000);
								}
								await refreshCollection();
								setSelectedAlbum(null);
							},
						)
					}
					onListen={async () =>
						await handleListen(user.id, selectedAlbum, (message) => {
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
					onListenLater={async () =>
						await handleListenLater(user.id, selectedAlbum, (message) =>{
							setSelectedAlbum(null);
							if (message) {
								setStatusMessage(message);
								setTimeout(() => setStatusMessage(null), 4000);
							}
						}
						)
					}
					onWant={async () =>
						await handleWant(user.id, selectedAlbum, (message) =>{
							setSelectedAlbum(null);
							if (message) {
								setStatusMessage(message);
								setTimeout(() => setStatusMessage(null), 4000);
							}
						})
					}
					onClose={() => setSelectedAlbum(null)}
					isCollected={collected}
					isListened={listenedState}
					isListenLater={listenLaterState}
                    isWanted={wantedState}
				/>
			)}
			{statusMessage && (
				<div className="toast" onClick={() => setStatusMessage(null)}>
					{statusMessage}
				</div>
			)}
		</div>
	);
}
