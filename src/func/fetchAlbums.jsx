import { useState, useEffect } from 'react';
import { getAlbumBySearch } from '../api/musicbrainz.js';
import { fetchCoverArt } from '../api/coverartarchive.js';
// import { searchAlbums } from '../api/itunes.js';

// depricated; switched back to musicbrainz
// function fetchAlbums(albumName, reqNumToShow){
//   const [albums, setAlbumData] = useState(null);
//   useEffect(() => {
//     async function loadAlbum() {
//       if (!albumName) return; // stop on start errors
//       const albumData = await searchAlbums(albumName, reqNumToShow); // put the upper limit
//       console.log("Received album data");
//       if (!albumData || albumData.length == 0) return; // nothing
//       const numberToShow = (reqNumToShow > albumData.length) ? albumData.length : reqNumToShow;
//       setAlbumData({ albums: albumData.slice(0, numberToShow)});
//     } loadAlbum();
//   }, [albumName, reqNumToShow]);
//   return albums;
// }


function fetchAlbums(albumName, artist, reqNumToShow) {
  const [albums, setAlbumData] = useState(null);
  useEffect(() => {
    async function loadAlbum() {
      if (!albumName) return;
      const rawData = await getAlbumBySearch(albumName, artist);
      const albumData = rawData["release-groups"].filter(group => group.score > 50)
        .filter(group => group["primary-type"] === "Album" || group["primary-type"] === "EP" )
        .filter(group => {
            const secondary = group["secondary-types"] || [];
            return !secondary.includes("Live") && 
                  !secondary.includes("Compilation") &&
                  !secondary.includes("Remix");
        });
      if (!albumData || albumData.length === 0) return;
      const numberToShow = Math.min(reqNumToShow, albumData.length);
      const coverPromises = albumData.slice(0, numberToShow).map(group => fetchCoverArt(group.id));
      const covers = await Promise.all(coverPromises);
      const merged = albumData.slice(0, numberToShow).map((group, i) => ({
        id: group.id,
        title: group.title,
        artist: group["artist-credit"]?.[0]?.name || "Unknown Artist",
        cover: covers[i],
        releaseDate: group["first-release-date"] || null,
        genre: null, // MusicBrainz doesn't have genre in this endpoint
        trackCount: null,
      }));
      setAlbumData({ albums: merged });
    }
    loadAlbum();
  }, [albumName, artist, reqNumToShow]);
  return albums;
}
export default fetchAlbums;