import { MusicBrainzApi } from 'musicbrainz-api';

const mbApi = new MusicBrainzApi({
    appName: 'DiskKnight',
    appVersion: '0.1.0',
    appContactInfo: 'tamzmanrock@gmail.com',
});


// add functions to mbApi if needed
// get the artist by mbid
// use the query function from the library
export async function getAlbumBySearch(albumName, artist) {
    try {
        let queryString = '';
        if (albumName && artist) queryString = `${albumName} artist:${artist}`; // user entered both
        else if (albumName) queryString = albumName; // user entered only one or the other!
        else if (artist) queryString = `artist:${artist}`;
const result = await mbApi.search('release-group', { query: queryString, limit: 100 });
        console.log(result);
        return result;
    } catch (error) {
        console.error("Error fetching album:", error);
        throw error;
    }
}

/*A release group, as the name suggests, is used to group releases into a single logical entity. 
Every release belongs to one, and only one, release group.
Both release groups and releases are "albums" in a general sense. 
But there is an important difference: a release is something you can buy, such as a CD or a digital download, 
while a release group embraces the overall concept of an album.*/
export async function searchArtists(artistName) {
  try {
    const result = await mbApi.search('artist', { query: artistName, limit: 20 });
    console.log(result);
    return result;
  } catch (error) {
    console.error("Error fetching artist:", error);
    throw error;
  }
}
export default mbApi;

// cool idea: scan a cd's barcode and get the album info from musicbrainz
