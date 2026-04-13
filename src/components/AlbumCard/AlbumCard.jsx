import styles from './AlbumCard.module.css';

function AlbumCard({title, artistName}){
    return (
        <div className={styles.card}>
        <h2>{title}</h2>
        <p>{artistName}</p>
        </div>
    );
}
export default AlbumCard;