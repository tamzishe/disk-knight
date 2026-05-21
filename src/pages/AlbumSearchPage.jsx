import fetchAlbums from "../func/fetchAlbums";
import AlbumCard from "../components/AlbumCard/AlbumCard";
import AlbumSearchBar from "../components/SearchBar/AlbumSearchBar";
import AlbumModal from "../components/AlbumModal/AlbumModal";
import { useState } from "react";
import styles from "../css/AlbumSearchPage.module.css";
import HomeButton from "../components/Buttons/HomeButton";
import { addToCollection, addToListened, isInCollection, isListened  } from "../func/collection";
import { handleCollect, handleListen } from '../func/handlers.js';
function AlbumSearchPage() {
  const [query, setQuery] = useState(null); // what we're searching for
  const [selectedAlbum, setSelectedAlbum] = useState(null); // this is for selecting an album
  const results = fetchAlbums(query?.album, query?.artist, 12); // results from that search
  
  return (
    <div>
      <div className="Header">
        <img src="/icon-192x192.png" alt="Logo" className="logo" />
        <h1>Disk Knight</h1>
      </div>
      <h1>Welcome to Disk Knight</h1>
      <HomeButton />
      <AlbumSearchBar
        onSearch={(album, artist) => setQuery({ album, artist })}
      />
      <div className={styles.albumList}>
        {!query?.album && <p>Search for an album!</p>}
        {/* No Query */}
        {query?.album && !results && <p>Loading...</p>}
        {/* No album received yet */}
        {results &&
          results.albums.map((album, i) => (
            <AlbumCard
              key={album.id}
              title={album.title}
              artistName={album.artistName}
              cover={album.cover}
              onClick={() => setSelectedAlbum(album)}
            />
          ))}
        {/* received the albums! */}
      </div>
      {selectedAlbum && (
        <AlbumModal
          album={selectedAlbum}
          onCollect={() => handleCollect(selectedAlbum, () => setSelectedAlbum(null))}
          onListen={() => handleListen(selectedAlbum, () => setSelectedAlbum(null))}
          onClose={() => setSelectedAlbum(null)}
          onRate={() => setSelectedAlbum({...selectedAlbum})}
          isCollected={isInCollection(selectedAlbum.id)}
          isListened={isListened(selectedAlbum?.id)}
        />
      )}
    </div>
  );
}

export default AlbumSearchPage;
