import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { searchUsers } from '../supabase/users.js';
import UserCard from '../components/UserCard/UserCard';
import HomeButton from '../components/Buttons/HomeButton';
import styles from '../css/UserSearchPage.module.css';

export default function UserSearchPage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searched, setSearched] = useState(false);

    const handleSearch = async () => {
        if (!query) return;
        setLoading(true);
        const data = await searchUsers(query);
        setResults(data);
        setSearched(true);
        setLoading(false);
    };

    return (
        <div>
            <div className="Header">
                <img src="/icon-192x192.png" alt="Logo" className="logo" />
                <h1>Disk Knight</h1>
            </div>
            <HomeButton />
            <h1>Find Users</h1>
            <div>
                <input
                    type="text"
                    placeholder="Search by username..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
                />
                <button onClick={handleSearch}>Search</button>
            </div>
            {loading && <p>Searching...</p>}
            {searched && results.length === 0 && <p>No users found!</p>}
            <div className={styles.userList}>
                {results.map(u => (
                    <UserCard
                        key={u.id}
                        name={u.username}
                        avatar={u.profile_image || '/blank-profile-512x512.png'}
                        onClick={() => navigate(`/user/${u.username}`)}
                    />
                ))}
            </div>
        </div>
    );
}