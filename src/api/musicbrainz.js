import { MusicBrainzApi } from 'musicbrainz-api';

const mbApi = new MusicBrainzApi({
    appName: 'DiskKnight',
    appVersion: '0.1.0',
    appContactInfo: 'tamzmanrock@gmail.com',
});

export default mbApi;