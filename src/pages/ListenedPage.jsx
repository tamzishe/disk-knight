import { useState } from 'react';
import { getListened, removeFromListened, isInCollection, isListened} from '../func/collection.js';
import AlbumCard from '../components/AlbumCard/AlbumCard';
import AlbumModal from '../components/AlbumModal/AlbumModal';
import HomeButton from '../components/Buttons/HomeButton';
import styles from '../css/ListenedPage.module.css';
import { handleCollect, handleListen } from '../func/handlers.js';
import { useParams } from 'react-router-dom';

export default function ListenedPage() {
  const [listened, setListened] = useState(getListened());
  const [selectedAlbum, setSelectedAlbum] = useState(null);



  const { username } = useParams();

  return (
    <div>
      <div className="Header">
        <img src="/icon-192x192.png" alt="Logo" className="logo" />
        <h1>Disk Knight</h1>
      </div>
      <HomeButton />
      <h1>{username}'s Listened</h1>
      {listened.length === 0 && <p>Nothing here yet!</p>}
      <div className={styles.albumList}>
        {listened.map(album => (
          <AlbumCard
            key={album.id}
            title={album.title}
            cover={album.cover}
            onClick={() => setSelectedAlbum(album)}
          />
        ))}
      </div>
      {selectedAlbum && (
        <AlbumModal
          album={selectedAlbum}
          onCollect={() => handleCollect(selectedAlbum, () => setSelectedAlbum(null))}
          onListen={() => handleListen(selectedAlbum, () => {
            setListened(getListened());
            setSelectedAlbum(null);
          })}
          onRate={() => setSelectedAlbum({...selectedAlbum})}
          onClose={() => setSelectedAlbum(null)}
          isCollected={isInCollection(selectedAlbum.id)}
          isListened={isListened(selectedAlbum?.id)}
        />
      )}
    </div>
  );
}