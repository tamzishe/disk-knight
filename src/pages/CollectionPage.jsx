import { useState } from "react";
import { getCollection, removeFromCollection, isListened, isInCollection, getListened, removeFromListened } from "../func/collection";
import { handleCollect, handleListen } from '../func/handlers.js';
import AlbumCard from "../components/AlbumCard/AlbumCard";
import AlbumModal from "../components/AlbumModal/AlbumModal";
import HomeButton from "../components/Buttons/HomeButton";
import styles from "../css/CollectionPage.module.css";
import { useParams } from "react-router-dom";

export default function CollectionPage() {
  const [collection, setCollection] = useState(getCollection());
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [listened, setListened] = useState(getListened());
  const { username } = useParams();
  

  return (
    <div>
      <div className="Header">
        <img src="/icon-192x192.png" alt="Logo" className="logo" />
        <h1>Disk Knight</h1>
      </div>
      <HomeButton />
      <h1>{username}'s Collection</h1>
      {collection.length === 0 && <p>No albums in your collection yet!</p>}
      <div className={styles.albumList}>
        {collection.map((album) => (
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
          onCollect={() => handleCollect(selectedAlbum, () => {
            setCollection(getCollection());
            setSelectedAlbum(null)
          })}
          onListen={() => handleListen(selectedAlbum, () => {
            setListened(getListened()); 
            setSelectedAlbum(null);
          })}
          onClose={() => setSelectedAlbum(null)}
          isCollected={isInCollection(selectedAlbum.id)}
          isListened={isListened(selectedAlbum?.id)}
        />
      )}
    </div>
  );
}
