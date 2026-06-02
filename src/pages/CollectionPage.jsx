import { useState, useEffect } from "react";
// import { getCollection, removeFromCollection, isListened, isInCollection, getListened, removeFromListened } from "../func/collection";
import { handleCollect, handleListen } from '../func/handlers.js';
import { getCollection, isInCollection } from '../supabase/collection.js';
import { isListened } from '../supabase/listened.js';
import AlbumCard from "../components/AlbumCard/AlbumCard";
import AlbumModal from "../components/AlbumModal/AlbumModal";
import HomeButton from "../components/Buttons/HomeButton";
import styles from "../css/CollectionPage.module.css";
import { useParams } from "react-router-dom";
import { useAuth } from '../context/AuthContext';

export default function CollectionPage() {
  const { user } = useAuth();
  const [collection, setCollection] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [collected, setCollected] = useState(false);
  const [listenedState, setListenedState] = useState(false);
  const { username } = useParams();

  useEffect(() => {
    async function loadCollection() {
      const data = await getCollection(user.id);
      setCollection(data);
    }
    loadCollection();
  }, [user.id]);

  const handleSelectAlbum = async (album) => {
    setSelectedAlbum(album);
    setCollected(await isInCollection(user.id, album.id));
    setListenedState(await isListened(user.id, album.id));
  };

  const refreshCollection = async () => {
    const data = await getCollection(user.id);
    setCollection(data);
  };
  

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
            albumId={album.id}
            onClick={() => handleSelectAlbum(album)}
          />
        ))}
      </div>
      {selectedAlbum && (
        <AlbumModal
          album={selectedAlbum}
          onCollect={async () => await handleCollect(user.id, selectedAlbum, async() => {
            await refreshCollection();
            setSelectedAlbum(null)
          })}
          onListen={async () => await handleListen(user.id, selectedAlbum, () => { 
            setSelectedAlbum(null);
          })}
          onRate={ () => setSelectedAlbum({...selectedAlbum})}
          onClose={() => setSelectedAlbum(null)}
          isCollected={collected}
          isListened={listenedState}
        />
      )}
    </div>
  );
}
