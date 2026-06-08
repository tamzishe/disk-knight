import { useState, useEffect } from "react";
// import { getCollection, removeFromCollection, isListened, isInCollection, getListened, removeFromListened } from "../func/collection";
import { handleCollect, handleListen } from "../func/handlers.js";
import { getCollection, isInCollection } from "../supabase/collection.js";
import { isListened } from "../supabase/listened.js";
import AlbumCard from "../components/AlbumCard/AlbumCard";
import AlbumModal from "../components/AlbumModal/AlbumModal";
import HomeButton from "../components/Buttons/HomeButton";
import styles from "../css/CollectionPage.module.css";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getRatingsForUser } from '../supabase/ratings.js';
import { getRatingByLabel } from '../func/ratings.js';
import { getUserProfile } from "../supabase/users.js";
import SortBar from "../components/SortBar/SortBar.jsx";
export default function CollectionPage() {
	const { user } = useAuth();
	const [collection, setCollection] = useState([]);
	const [selectedAlbum, setSelectedAlbum] = useState(null);
	const [collected, setCollected] = useState(false);
	const [listenedState, setListenedState] = useState(false);
	const [sortBy, setSortBy] = useState('date');
	const [ratings, setRatings] = useState({});
	const { username: profileUsername } = useParams();
	const [currentProfile, setCurrentProfile] = useState(null);

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
	};

	const refreshCollection = async () => { // if on own page
		const data = await getCollection(user.id);
		setCollection(data);
	};
	const refreshRatings = async () => { // if on own page
		const ratingsMap = await getRatingsForUser(user.id);
		setRatings(ratingsMap);
	};

	const ratingValues = { Perfect: 10, Excellent: 9, Amazing: 8, Great: 7, Good: 6, Mid: 5, Bad: 0 };
	
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

	return (
		<div>
			<div className="Header">
				<img src="/icon-192x192.png" alt="Logo" className="logo" />
				<h1>Disk Knight</h1>
			</div>
			<HomeButton />
			<h1>{currentProfile?.username || profileUsername}'s Collection</h1>
			<SortBar sortBy={sortBy} setSortBy={setSortBy} />
			{collection.length === 0 && (
				<p>No albums in your collection yet!</p>
			)}
			<div className={styles.albumList}>
				{sorted.map((album) => (
					<AlbumCard
						key={album.id}
						title={album.title}
						cover={album.cover}
						albumId={album.id}
						rating = {ratings[album.id] ? getRatingByLabel(ratings[album.id]) : null}
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
							async () => {
								await refreshCollection();
								setSelectedAlbum(null);
							},
						)
					}
					onListen={async () =>
						await handleListen(user.id, selectedAlbum, () => {
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
				/>
			)}
		</div>
	);
}
