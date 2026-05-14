import styles from './AlbumModal.module.css';

export default function AlbumModal({ album, onCollect, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <img className={styles.cover}src={album.cover} alt={album.title} />
        <h2>{album.title}</h2>
        <p>{album.artist}</p>
        <button onClick={onCollect}>Collect</button>
        <button disabled>Add to List</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}