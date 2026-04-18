import fetchAlbums from './func/fetchAlbums';
import AlbumCard from './components/AlbumCard/AlbumCard';
import AlbumSearchBar from './components/SearchBar/SearchBar';
import { useState } from 'react';

function App() {
  const [query, setQuery] = useState(null); // what we're searching for
  const album = fetchAlbums(query);            // results from that search

  return (
    <div>
      <div className="Header">
        <img src="/icon-192x192.png" alt="Logo" className="logo" />
        <h1>Disk Knight</h1>
      </div>
      <h1>Welcome to Disk Knight</h1>
      <AlbumSearchBar onSearch={(q) => setQuery(q)} />
      {!query && <p>Search for an album!</p>} 
      {/* No Query */}
      {query && !album && <p>Loading...</p>}
      {/* No album received yet */}
      {album && <AlbumCard title={album.album.title} cover={album.cover} />}
      {/* received the album! */}
    </div>
  );
}

export default App;