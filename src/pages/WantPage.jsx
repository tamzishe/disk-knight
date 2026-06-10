import { useState, useEffect } from "react";
import AlbumCard from "../components/AlbumCard/AlbumCard";
import AlbumModal from "../components/AlbumModal/AlbumModal";
import HomeButton from "../components/Buttons/HomeButton";
import styles from "../css/WantPage.module.css";
import { handleCollect, handleListen, handleListenLater, handleWant } from "../func/handlers.js";
import { getWant, isInWant } from "../supabase/want.js";
import { isInCollection } from "../supabase/collection.js";
import { isListened } from "../supabase/listened.js";
import { useAuth } from "../context/AuthContext";
import { getRatingsForUser } from "../supabase/ratings.js";
import { getRatingByLabel } from "../func/ratings.js";
import SortBar from "../components/SortBar/SortBar.jsx";
import { isInListenLater } from "../supabase/listenLater.js";

export default function WantPage() {
    const { user } = useAuth();
    const [want, setWant] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [collected, setCollected] = useState(false);
    const [listenedState, setListenedState] = useState(false);
    const [ratings, setRatings] = useState({});
    const [sortBy, setSortBy] = useState('date');
    const [listenLaterState, setListenLaterState] = useState(false);
    const [wantedState, setWantedState] = useState(false);
    const [statusMessage, setStatusMessage] = useState(null);

    useEffect(() => {
        async function loadWant() {
            const data = await getWant(user.id);
            setWant(data);
            const ratingsMap = await getRatingsForUser(user.id);
            setRatings(ratingsMap);
        }
        loadWant();
    }, [user.id]);

    const handleSelectAlbum = async (album) => {
        setSelectedAlbum(album);
        setCollected(await isInCollection(user.id, album.id));
        setListenedState(await isListened(user.id, album.id));
        setListenLaterState(await isInListenLater(user.id, album.id));
        setWantedState(await isInWant(user.id, album.id));
    };

    const refreshWant = async () => {
        const data = await getWant(user.id);
        setWant(data);
    };

    const refreshRatings = async () => {
        const ratingsMap = await getRatingsForUser(user.id);
        setRatings(ratingsMap);
    };

    const sorted = [...want].sort((a, b) => {
        if (sortBy === "date") return new Date(b.time_added) - new Date(a.time_added);
        if (sortBy === "title") return a.title.localeCompare(b.title);
    });

    return (
        <div>
            <div className="Header">
                <img src="/icon-192x192.png" alt="Logo" className="logo" />
                <h1>Disk Knight</h1>
            </div>
            <HomeButton />
            <h1>Want</h1>
            <SortBar sortBy={sortBy} setSortBy={setSortBy} />
            {want.length === 0 && <p>Nothing here yet!</p>}
            <div className={styles.albumList}>
                {sorted.map((album) => (
                    <AlbumCard
                        key={album.id}
                        title={album.title}
                        cover={album.cover}
                        albumId={album.id}
                        rating={ratings[album.id] ? getRatingByLabel(ratings[album.id]) : null}
                        onClick={() => handleSelectAlbum(album)}
                    />
                ))}
            </div>
            {selectedAlbum && (
                <AlbumModal
                    album={selectedAlbum}
                    onCollect={async () =>
                        await handleCollect(user.id, selectedAlbum, (message) => {
                            if (message) {
								setStatusMessage(message);
								setTimeout(() => setStatusMessage(null), 4000);
							}
                            setSelectedAlbum(null);
                        })
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
                    onListenLater={async () =>
                        await handleListenLater(user.id, selectedAlbum, (message) => {
                            if (message) {
								setStatusMessage(message);
								setTimeout(() => setStatusMessage(null), 4000);
							}
                            setSelectedAlbum(null);
                        })
                    }
                    onWant={async () =>
                        await handleWant(user.id, selectedAlbum, async (message) => {
                            if (message) {
								setStatusMessage(message);
								setTimeout(() => setStatusMessage(null), 4000);
							}
                            await refreshWant();
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