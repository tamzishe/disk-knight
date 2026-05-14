import { useState } from 'react';

function Search({ search, setSearch, onSearch }) {
  return (
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      onKeyDown={(e) => { if (e.key === 'Enter') onSearch(); }}
      placeholder="Artist name..."
    />
  );
}

export default function ArtistSearchBar({ onSearch }) {
  const [artist, setArtist] = useState('');
  const [error, setError] = useState('');

  const handleSearch = () => {
    if (!artist) {
      setError('Please enter an artist name.');
      return;
    }
    setError('');
    onSearch(artist);
  };

  return (
    <div>
      <p>Artist: </p>
      <Search search={artist} setSearch={setArtist} onSearch={handleSearch} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}