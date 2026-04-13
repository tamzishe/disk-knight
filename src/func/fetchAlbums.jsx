import { useState, useEffect } from 'react';
import { getAlbumBySearch } from '../api/musicbrainz.js';
import { fetchCoverArt } from '../api/coverartarchive.js';

function fetchAlbums(albumName) {
  const [album, setAlbumData] = useState(null);

  useEffect(() => {
    async function loadAlbum() {
      const albumData = await getAlbumBySearch(albumName);
      if (!albumData.releases || albumData.releases.length === 0) return;
      const cover = await fetchCoverArt(albumData.releases[0].id);
      setAlbumData({ album: albumData.releases[0], cover: cover });
    }
    loadAlbum();
  }, [albumName]);

  return album;
}

export default fetchAlbums;