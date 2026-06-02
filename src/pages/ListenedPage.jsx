import { useState, useEffect } from "react";
// import { getListened, removeFromListened, isInCollection, isListened} from '../func/collection.js';
import AlbumCard from "../components/AlbumCard/AlbumCard";
import AlbumModal from "../components/AlbumModal/AlbumModal";
import HomeButton from "../components/Buttons/HomeButton";
import styles from "../css/ListenedPage.module.css";
import { handleCollect, handleListen } from "../func/handlers.js";

import { getListened, isListened } from "../supabase/listened.js";
import { isInCollection } from "../supabase/collection.js";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ListenedPage() {
	const { user } = useAuth();
	const [listened, setListened] = useState([]);
	const [selectedAlbum, setSelectedAlbum] = useState(null);
	const [collected, setCollected] = useState(false);
	const [listenedState, setListenedState] = useState(false);
	const [ratingKey, setRatingKey] = useState(0);
	const { username } = useParams();

	useEffect(() => {
		async function loadListened() {
			const data = await getListened(user.id);
			setListened(data);
		}
		loadListened();
	}, [user.id]);

	const handleSelectAlbum = async (album) => {
		setSelectedAlbum(album);
		setCollected(await isInCollection(user.id, album.id));
		setListenedState(await isListened(user.id, album.id));
	};

	const refreshListened = async () => {
		const data = await getListened(user.id);
		setListened(data);
	};
	return (
		<div>
			<div className="Header">
				<img src="/icon-192x192.png" alt="Logo" className="logo" />
				<h1>Disk Knight</h1>
			</div>
			<HomeButton />
			<h1>{username}'s Listened</h1>
			{listened.length === 0 && <p>Nothing here yet!</p>}
			<div className={styles.albumList}>
				{listened.map((album) => (
					<AlbumCard
						key={`${album.id}-${ratingKey}`}
						title={album.title}
						cover={album.cover}
						albumId={album.id}
						onClick={() => handleSelectAlbum(album)}
					/>
				))}
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
						await handleListen(user.id, selectedAlbum, async () => {
							await refreshListened();
							setSelectedAlbum(null);
						})
					}
					onRate={() => {
						setRatingKey((k) => k + 1);
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
