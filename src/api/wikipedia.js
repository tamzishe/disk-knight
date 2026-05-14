export async function fetchArtistImage(artistName) {
    try {
        const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(artistName)}&prop=pageimages&format=json&pithumbsize=300&origin=*`;
        const response = await fetch(url);
        const data = await response.json();
        
        const pages = data.query.pages;
        const page = Object.values(pages)[0]; // get the first page result
        
        return page?.thumbnail?.source || '/blank_artist.png'; // fallback if no image
    } catch (error) {
        console.error("Error fetching artist image:", error);
        return '/blank_artist.png';
    }
}