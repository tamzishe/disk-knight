import { useState } from 'react';
import ArtistSearchBar from '../components/SearchBar/ArtistSearchBar';
import ArtistCard from '../components/ArtistCard/ArtistCard';
import fetchArtists from '../func/fetchArtists';
import styles from '../css/AlbumSearchPage.module.css';

function ArtistSearchPage() {
  const [query, setQuery] = useState(null);
  const results = fetchArtists(query, 12);

  return (
    <div>
      <div className="Header">
        <img src="/icon-192x192.png" alt="Logo" className="logo" />
        <h1>Disk Knight</h1>
      </div>
      <h1>Search Artists</h1>
      <HomeButton/>
      <ArtistSearchBar onSearch={(artist) => setQuery(artist)} />
      <div className={styles.albumList}>
        {!query && <p>Search for an artist!</p>}
        {query && !results && <p>Loading...</p>}
        {results && results.artists.map((artist) => (
          <ArtistCard
            key={artist.id}
            name={artist.name}
            disambiguation={artist.disambiguation}
          />
        ))}
      </div>
    </div>
  );
}

export default ArtistSearchPage;