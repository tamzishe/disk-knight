import styles from './AlbumCard.module.css';
import { getRating, getRatingByLabel } from '../../func/ratings.js';

function AlbumCard({title, artistName, cover, onClick, albumId}){
    const rating = getRating(albumId);
    const ratingData = getRatingByLabel(rating);
    return (
        <div className={styles.card} onClick={onClick}>
        <div className={styles.coverWrapper}>
            <img className={styles.cover} src={cover} alt={title} />
            {ratingData && (
                <div className={styles.badge} style={{ backgroundColor: ratingData.color }}>
                    <span>{ratingData.label}</span>
                </div>
            )}
        </div>
        <h2 className={styles.title}>{title}</h2>
        </div>
    );
}
export default AlbumCard;