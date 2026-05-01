import fetchAlbums from './func/fetchAlbums';
import AlbumCard from './components/AlbumCard/AlbumCard';
import AlbumSearchBar from './components/SearchBar/SearchBar';
import { useState } from 'react';
import styles from './App.module.css';

function App() {
  const [query, setQuery] = useState(null); // what we're searching for
  const results = fetchAlbums(query?.album, query?.artist, 12);           // results from that search

  return (
    <div>
      <div className="Header">
        <img src="/icon-192x192.png" alt="Logo" className="logo" />
        <h1>Disk Knight</h1>
      </div>
      <h1>Welcome to Disk Knight</h1>
      <AlbumSearchBar onSearch={(album, artist) => setQuery({album, artist})} />
      <div className={styles.albumList}>
      {!query?.album && <p>Search for an album!</p>}
      {/* No Query */}
      {query?.album && !results && <p>Loading...</p>}
      {/* No album received yet */}
      {results && results.albums.map((album, i) =>(
        <AlbumCard
          key={album.id}
          title={album.title}
          cover={album.cover}
        />
      ))}
      {/* received the albums! */}
      </div>
    </div>
  );
}

export default App;