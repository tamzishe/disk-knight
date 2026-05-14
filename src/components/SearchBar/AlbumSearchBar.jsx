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
        console.log("album:", album, "artist:", artist);
    if (!album) return; // need at least one
        onSearch(album, artist);
    };
    return <div>
        
            <p>Album: </p>
            <Search search={album} setSearch={setAlbum} onSearch={handleSearch} />
        
            <p>Artist: </p>
            <Search search={artist} setSearch={setArtist} onSearch={handleSearch} />
           
        </div>
}