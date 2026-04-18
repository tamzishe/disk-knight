import fetchAlbums from './func/fetchAlbums';
import AlbumCard from './components/AlbumCard/AlbumCard';
import AlbumSearchBar from './components/SearchBar/SearchBar';
import { useState } from 'react';

function App() {
  const [query, setQuery] = useState(null); // what we're searching for
  const results = fetchAlbums(query, 10);            // results from that search

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
      {query && !results && <p>Loading...</p>}
      {/* No album received yet */}
      {results && results.albums.map((album, i) =>(
        <AlbumCard
        key={album.id}
        title={album.title}
        cover={results.covers[i]}
        />
      ))}
      {/* received the albums! */}
    </div>
  );
}

export default App;