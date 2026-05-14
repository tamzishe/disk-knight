export async function searchAlbums(query, limit = 50) {
    try {
        // const url = `https://itunes.apple.com/search?term=${encodeURIComponent("yeezus kanye west")}&entity=album&limit=${limit * 2}&explicit=Yes`;
        const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=album&limit=${limit * 2}&explicit=Yes`;
        const response = await fetch(url);
        const data = await response.json();

        if (!data.results || data.results.length === 0) return [];
        
        data.results.forEach(album => {
            console.log(`${album.collectionName} by ${album.artistName} — type: ${album.collectionType}`);
        });
        return data.results
        .filter(album => (album.collectionType === 'Album' || album.collectionType === 'EP') && album.trackCount > 4) // exclude singles!!
        .map(album => ({
            id: album.collectionId,
            title: album.collectionName,
            artist: album.artistName,
            cover: album.artworkUrl100.replace('100x100', '600x600'),
            releaseDate: album.releaseDate,
            genre: album.primaryGenreName,
            trackCount: album.trackCount,
        }));
    } catch (error) {
        console.error("Error fetching from iTunes:", error);
        return [];
    }
}