import styles from './AlbumCard.module.css';

function AlbumCard({title, artistName, cover, onClick}){
    return (
        <div className={styles.card} onClick={onClick}>
        <h2>{title}</h2>
        <p>{artistName}</p>
        <img className={styles.icon} src={cover} alt={title} />
        </div>
    );
}
export default AlbumCard;