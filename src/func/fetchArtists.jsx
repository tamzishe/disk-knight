import { useState, useEffect } from "react";
import { searchArtists } from "../api/musicbrainz.js";
import { fetchArtistImage } from "../api/wikipedia.js";

function fetchArtists(artistName, reqNumToShow) {
  const [artists, setArtistData] = useState(null);

  useEffect(() => {
    async function loadArtists() {
      if (!artistName) return;
      const rawData = await searchArtists(artistName);
      const artistData = rawData.artists.filter((a) => a.score > 70);
      if (!artistData || artistData.length === 0) return;
      const numberToShow = Math.min(reqNumToShow, artistData.length);
      
      //@Deprecated
      // const imagePromises = artistData.slice(0, numberToShow).map(a =>
      //     fetchArtistImage(a.name)
      // );
      // const images = await Promise.all(imagePromises);
      // console.log("images:", images);

      const merged = artistData.slice(0, numberToShow).map((a, i) => ({
        id: a.id,
        name: a.name,
        disambiguation: a.disambiguation || null,
        type: a.type || null,
        // image: images[i],
      }));
      setArtistData({ artists: merged });
    }
    loadArtists();
  }, [artistName, reqNumToShow]);

  return artists;
}
export default fetchArtists;
