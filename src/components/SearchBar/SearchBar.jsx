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
    const [search, setSearch] = useState('');
    return <div>
        <Search search={search} setSearch={setSearch} onSearch={onSearch} />
        <p>{search}</p>
    </div>
}