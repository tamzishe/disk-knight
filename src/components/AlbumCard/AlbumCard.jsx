import { useState, useEffect } from "react";
import { getRatingByLabel } from "../../func/ratings.js";
import { getRating } from "../../supabase/ratings.js";
import { useAuth } from "../../context/AuthContext.jsx";
import styles from "./AlbumCard.module.css";

function AlbumCard({ title, cover, onClick, albumId }) {
	const { user } = useAuth();
	const [ratingData, setRatingData] = useState(null);

	useEffect(() => {
		async function loadRating() {
			if (!albumId || !user) return;
			const rating = await getRating(user.id, albumId);
			if (rating) setRatingData(getRatingByLabel(rating));
		}
		loadRating();
	}, [albumId, user]);

	return (
		<div className={styles.card} onClick={onClick}>
			<div className={styles.coverWrapper}>
				<img src={cover} alt={title} className={styles.cover} />
				{ratingData && (
					<span
						className={styles.badge}
						style={{ background: ratingData.color }}
					>
						{ratingData.label}
					</span>
				)}
			</div>
			<h2 className={styles.title}>{title}</h2>
		</div>
	);
}
export default AlbumCard;
