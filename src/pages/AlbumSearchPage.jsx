import fetchAlbums from "../func/fetchAlbums";
import AlbumCard from "../components/AlbumCard/AlbumCard";
import AlbumSearchBar from "../components/SearchBar/AlbumSearchBar";
import AlbumModal from "../components/AlbumModal/AlbumModal";
import { useState } from "react";
import styles from "../css/AlbumSearchPage.module.css";
import HomeButton from "../components/Buttons/HomeButton";
// import { addToCollection, addToListened, isInCollection, isListened  } from "../func/collection";
import { handleCollect, handleListen } from "../func/handlers.js";
import { isInCollection } from "../supabase/collection.js";
import { isListened } from "../supabase/listened.js";
import { useAuth } from "../context/AuthContext";

function AlbumSearchPage() {
	const { user } = useAuth();
	const [query, setQuery] = useState(null); // what we're searching for
	const [selectedAlbum, setSelectedAlbum] = useState(null); // this is for selecting an album
	const results = fetchAlbums(query?.album, query?.artist, 12); // results from that search
	const [collected, setCollected] = useState(false);
	const [listened, setListened] = useState(false);
	const [ratingKey, setRatingKey] = useState(0);

	// when an album is selected, check its status
	const handleSelectAlbum = async (album) => {
		setSelectedAlbum(album);
		setCollected(await isInCollection(user.id, album.id));
		setListened(await isListened(user.id, album.id));
	};
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
							key={`${album.id}-${ratingKey}`}
							title={album.title}
							artistName={album.artistName}
							cover={album.cover}
							albumId={album.id}
							onClick={() => handleSelectAlbum(album)}
						/>
					))}
				{/* received the albums! */}
			</div>
			{selectedAlbum && (
				<AlbumModal
				
					album={selectedAlbum}
					onCollect={async () =>
						await handleCollect(user.id, selectedAlbum, () =>
							setSelectedAlbum(null),
						)
					}
					onListen={async () =>
						await handleListen(user.id, selectedAlbum, () =>
							setSelectedAlbum(null),
						)
					}
					onClose={() => setSelectedAlbum(null)}
					onRate={() => {
						setRatingKey((k) => k + 1);
						setSelectedAlbum({ ...selectedAlbum });
					}}
					isCollected={collected}
					isListened={listened}
				/>
			)}
		</div>
	);
}

export default AlbumSearchPage;
