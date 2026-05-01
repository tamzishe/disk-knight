import { useState } from "react"

function Search({search, setSearch, onSearch}){
    return <input 
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    onKeyDown={(e) => { // if entered, it will send the actual query
      if (e.key === 'Enter') onSearch(search);
    }}
    />
};
export default function AlbumSearchBar({onSearch}){
    const [album, setAlbum] = useState('');
    const [artist, setArtist] = useState('');

    const handleSearch = () => {
        if (!album) return;
        onSearch(album, artist);
    };
    
    return <div>
            <Search search={album} setSearch={setAlbum} onSearch={handleSearch} />
            <Search search={artist} setSearch={setArtist} onSearch={handleSearch} />
        </div>
}