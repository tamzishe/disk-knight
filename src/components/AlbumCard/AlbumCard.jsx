import styles from './AlbumCard.module.css';

function AlbumCard({title, artistName, cover}){
    return (
        <div className={styles.card}>
        <h2>{title}</h2>
        <p>{artistName}</p>
        <img className={styles.icon} src={cover} alt="Album Cover" />
        </div>
    );
}
export default AlbumCard;