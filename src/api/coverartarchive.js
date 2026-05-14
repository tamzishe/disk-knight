import { CoverArtArchiveApi } from 'musicbrainz-api';

const coverArtArchiveApiClient = new CoverArtArchiveApi();

export async function fetchCoverArt(releaseMbid, coverType = '') {
    try {
        const coverInfo = await coverArtArchiveApiClient.getReleaseGroupCovers(releaseMbid);
        for(const image of coverInfo.images) {
            if (image.front) {
                console.log(`Cover art front=${image.front} back=${image.back} url=${image.image}`);
                return image.image;
            }
        }
        return '/blank_disc.png';
    } catch (error) {
        console.error("Error fetching cover art:", error);
        return '/blank_disc.png';
    }
}

// fetchCoverArt('976e0677-a480-4a5e-a177-6a86c1900bbf').catch(error => {
//     console.error(`Failed to fetch cover art: ${error.message}`);
// })
export default coverArtArchiveApiClient;