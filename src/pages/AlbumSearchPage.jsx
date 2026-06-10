import fetchAlbums from "../func/fetchAlbums";
import AlbumCard from "../components/AlbumCard/AlbumCard";
import AlbumSearchBar from "../components/SearchBar/AlbumSearchBar";
import AlbumModal from "../components/AlbumModal/AlbumModal";

import styles from "../css/AlbumSearchPage.module.css";
import HomeButton from "../components/Buttons/HomeButton";
import { useState, useEffect } from "react";
import { handleCollect, handleListen, handleListenLater, handleWant } from "../func/handlers.js";
import { isInCollection } from "../supabase/collection.js";
import { isListened } from "../supabase/listened.js";
import { useAuth } from "../context/AuthContext";
import { getRatingsForUser } from '../supabase/ratings.js';
import { getRatingByLabel } from '../func/ratings.js';
import { isInListenLater } from "../supabase/listenLater.js";
import { isInWant } from "../supabase/want.js";

function AlbumSearchPage() {
	const { user } = useAuth();
	const [query, setQuery] = useState(null); // what we're searching for
	const [selectedAlbum, setSelectedAlbum] = useState(null); // this is for selecting an album
	const results = fetchAlbums(query?.album, query?.artist, 12); // results from that search
	const [collected, setCollected] = useState(false);
	const [listened, setListened] = useState(false);
	const [ratings, setRatings] = useState({});
	const [listenLaterState, setListenLaterState] = useState(false);
	const [wantedState, setWantedState] = useState(false);
	const [statusMessage, setStatusMessage] = useState(null);

	// when an album is selected, check its status
	const handleSelectAlbum = async (album) => {
		setSelectedAlbum(album);
		setCollected(await isInCollection(user.id, album.id));
		setListened(await isListened(user.id, album.id));
		setListenLaterState(await isInListenLater(user.id, album.id));
		setWantedState(await isInWant(user.id, album.id));
	};

	const refreshRatings = async () => {
		const ratingsMap = await getRatingsForUser(user.id);
		setRatings(ratingsMap);
	};

	useEffect(() => {
		async function loadRatings() {
			if (!user) return;
			const ratingsMap = await getRatingsForUser(user.id);
			setRatings(ratingsMap);
		}
		loadRatings();
	}, [user.id]);

	return (
		<div>
			<div className="Header">
				<img src="/icon-192x192.png" alt="Logo" className="logo" />
				<h1>Disk Knight</h1>
			</div>
			<h1>Welcome to Disk Knight</h1>
			<HomeButton />
			<AlbumSearchBar
				onSearch={(album, artist) => setQuery({ album, artist })}
			/>
			<div className={styles.albumList}>
				{!query?.album && <p>Search for an album!</p>}
				{/* No Query */}
				{query?.album && !results && <p>Loading...</p>}
				{/* No album received yet */}
				{results &&
					results.albums.map((album) => (
						<AlbumCard
							key={album.id}
							title={album.title}
							artistName={album.artistName}
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
				{/* received the albums! */}
			</div>
			{selectedAlbum && (
				<AlbumModal
					album={selectedAlbum}
					onCollect={async () =>
						await handleCollect(user.id, selectedAlbum, (message) =>{
							if (message) {
								setStatusMessage(message);
								setTimeout(() => setStatusMessage(null), 4000);
							}
							setSelectedAlbum(null);
						})
					}
					onListen={async () =>
						await handleListen(user.id, selectedAlbum, (message) =>{
							if (message) {
								setStatusMessage(message);
								setTimeout(() => setStatusMessage(null), 4000);
							}
							setSelectedAlbum(null);
						})
					}
					onListenLater={async () =>
						await handleListenLater(user.id, selectedAlbum, (message) =>{
							if (message) {
								setStatusMessage(message);
								setTimeout(() => setStatusMessage(null), 4000);
							}
							setSelectedAlbum(null);
						})
					}
					onWant={async () =>
						await handleWant(user.id, selectedAlbum, (message) =>{
							if (message) {
								setStatusMessage(message);
								setTimeout(() => setStatusMessage(null), 4000);
							}
							setSelectedAlbum(null);
						})
					}
					onClose={() => setSelectedAlbum(null)}
					onRate={() => {
						refreshRatings();
						setSelectedAlbum({ ...selectedAlbum });
					}}
					isCollected={collected}
					isListened={listened}
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

export default AlbumSearchPage;
