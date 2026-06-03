import styles from "./AlbumCard.module.css";

function AlbumCard({ title, cover, onClick, albumId, rating }) {
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
