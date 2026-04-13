import fetchAlbums from './func/fetchAlbums';
import AlbumCard from './components/AlbumCard/AlbumCard';

function App() {
  const album = fetchAlbums("Views");

  if (!album) return <div>Loading...</div>;

  return (
    <div>
      <div className="Header">
        <img src="/icon-192x192.png" alt="Logo" className="logo" />
        <h1>Disk Knight</h1>
      </div>
      <h1>Welcome to Disk Knight</h1>
      <AlbumCard title={album.album.title} cover={album.cover} />
    </div>
  );
}

export default App;