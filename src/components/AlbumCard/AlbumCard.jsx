import styles from "./AlbumCard.module.css";

function AlbumCard({ title, cover, onClick, albumId, rating, small }) {
  return (
    <div 
      className={small ? styles.smallCard : styles.card} 
      onClick={onClick}
    >
      <div className={small ? styles.smallCoverWrapper : styles.coverWrapper}>
        <img src={cover} alt={title} className={small ? styles.smallCover : styles.cover} />
        {rating && (
          <span className={styles.badge} style={{ background: rating.color }}>
            {rating.label}
          </span>
        )}
      </div>
      {!small && <h2 className={styles.title}>{title}</h2>}
    </div>
  );
}
export default AlbumCard;
