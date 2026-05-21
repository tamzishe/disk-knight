import styles from './AlbumModal.module.css';
import { getRatings, getRating, saveRating } from '../../func/ratings.js';

export default function AlbumModal({ album, onCollect, onListen, onClose, isCollected, isListened, onRate }) {
  const canRate = isListened; // removed isCollected
  const currentRating = getRating(album.id);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <img className={styles.cover} src={album.cover} alt={album.title} />
        <h2>{album.title}</h2>
        <p>{album.artist}</p>
        <button onClick={onCollect}>
          {isCollected ? 'Remove from Collection' : 'Collect'}
        </button>
        <button onClick={onListen}>
          {isListened ? 'Remove from Listened' : 'Mark as Listened'}
        </button>
        {canRate && (
          <div>
            <p>Your rating: {currentRating || 'Not rated yet'}</p>
            <div className={styles.ratings}>
              {getRatings().map(r => (
                <button
                  key={r.label}
                  className={currentRating === r.label ? styles.ratingSelected : styles.ratingButton}
                  onClick={() => {
                    saveRating(album.id, r.label);
                    onRate();
                  }}
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