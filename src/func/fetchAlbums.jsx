import { useState, useEffect } from 'react';
import { getAlbumBySearch } from '../api/musicbrainz.js';
import { fetchCoverArt } from '../api/coverartarchive.js';

function fetchAlbums(albumName, reqNumToShow) {
  const [albums, setAlbumData] = useState(null);
  
  useEffect(() => {
    async function loadAlbum() {
      if (!albumName) return; // stop on start errors
      const rawData = await getAlbumBySearch(albumName); 
      const albumData = rawData["release-groups"].filter(group => group.score > 70); // filter out bad responses!
      console.log("Received album data as release-group");
      // get the albums, limited to 10 in getAlbumBySearch
      if (!albumData || albumData.length == 0) return; // nothing
      const numberToShow = (reqNumToShow > albumData.length) ? albumData.length : reqNumToShow;
      // promises are requests that we send, move on and wait to receive simply put
      const coverPromises = albumData.slice(0, numberToShow).map(group => fetchCoverArt(group.id));
      //map is almost like a for loop that goes through an array and transforms it into something new
      console.log("Getting covers!");
      const covers = await Promise.all(coverPromises);
      setAlbumData({ albums: albumData.slice(0, numberToShow), covers: covers });
    }
    loadAlbum();
  }, [albumName, reqNumToShow]);

  return albums;
}

export default fetchAlbums;