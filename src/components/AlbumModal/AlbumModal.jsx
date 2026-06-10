import { useState, useEffect } from "react";
import styles from "./AlbumModal.module.css";
import { getRatings } from "../../func/ratings.js";
import { getRating, saveRating } from "../../supabase/ratings.js";
import { useAuth } from "../../context/AuthContext.jsx";

function AlbumModal({
	album,
	onCollect,
	onListen,
	onListenLater,
	onWant,
	onClose,
	isCollected,
	isListened,
	isListenLater,
	isWanted,
	onRate,
}) {
	const { user } = useAuth();
	const [currentRating, setCurrentRating] = useState(null);
	const canRate = isListened;

	useEffect(() => {
		async function loadRating() {
			const rating = await getRating(user.id, album.id);
			setCurrentRating(rating);
		}
		loadRating();
	}, [album.id, user.id]);

	const handleRate = async (label) => {
		await saveRating(user.id, album.id, label);
		setCurrentRating(label);
		if (onRate) onRate();
	};

	return (
		<div className={styles.overlay} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<img
					className={styles.cover}
					src={album.cover}
					alt={album.title}
				/>
				<h2>{album.title}</h2>
				<p>{album.artist}</p>
				<button onClick={onCollect}>
					{isCollected ? "Remove from Collection" : "Collect"}
				</button>
				<button onClick={onListen}>
					{isListened ? "Remove from Listened" : "Mark as Listened"}
				</button>
				{!isListened && (<button onClick={onListenLater}>
					{isListenLater ? "Remove from Listen Later" : "Add to Listen Later"}
				</button>)}
				{!isCollected && (<button onClick={onWant}>
					{isWanted ? "Remove from Want List" : "Add to Want List"}
				</button>)}
				{canRate && (
					<div>
						<p>Your rating: {currentRating || "Not rated yet"}</p>
						<div className={styles.ratings}>
							{getRatings().map((r) => (
								<button
									key={r.label}
									className={
										currentRating === r.label
											? styles.ratingSelected
											: styles.ratingButton
									}
									onClick={() => handleRate(r.label)}
								>
									{r.label}
								</button>
							))}
						</div>
					</div>
				)}
				<button disabled>Add to List</button>
				<button onClick={onClose}>Cancel</button>
			</div>
		</div>
	);
}
export default AlbumModal;
