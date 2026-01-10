import {useEffect, useState} from 'react'
import { getAlbumBySearch } from './api/musicbrainz.js';
import { fetchCoverArt } from './api/coverartarchive.js';

function App() {
  // usestate is used to "rerender" the page when data changed
  // useEffect is used to run code on component load
  const [album, setAlbumData] = useState(null);
  useEffect(() => {
    
    async function loadAlbum() {
      const albumName = "The Dark Side of the Moon";
      const albumData = await getAlbumBySearch(albumName);
      if (!albumData.releases || albumData.releases.length === 0) { // check if we got results
        console.log("No releases found for album:", albumName);
        return;
      }
      const cover = await fetchCoverArt(albumData.releases[0].id);
      setAlbumData({ album: albumData.releases[0], cover: cover });
    }
    loadAlbum();
  }, []); // empty array means this runs once on a component load
  if (!album) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="Header"> {/* create header*/}
        <img src="/icon-192x192.png" alt="Logo" className="logo" />  
        <h1>Disk Knight</h1>
      </div>
      <h1>Welcome to Disk Knight</h1>
      <p>If you see an album cover, it's working!</p>
      <div>
        <h2>{album.album.title}</h2>
        <img src={album.cover} alt="Album Cover" />
      </div>
    </div>
  )
}

export default App

