import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserProfile } from '../supabase/users.js';
import { getFollowers, getFollowing } from '../supabase/follows.js';
import UserCard from '../components/UserCard/UserCard';
import HomeButton from '../components/Buttons/HomeButton';
import styles from '../css/FollowPage.module.css';

export default function FollowPage() {
  const { username, type } = useParams(); // type is 'followers' or 'following'
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const profile = await getUserProfile(username);
      setCurrentProfile(profile);
      if (!profile) return;
      const data = type === 'followers'
        ? await getFollowers(profile.id)
        : await getFollowing(profile.id);
      setUsers(data);
      setLoading(false);
    }
    load();
  }, [username, type]);

  return (
    <div>
      <div className="Header">
        <img src="/icon-192x192.png" alt="Logo" className="logo" />
        <h1>Disk Knight</h1>
      </div>
      <HomeButton />
      <button onClick={() => navigate(`/user/${username}`)}>
        ← Back to {username}'s Profile
      </button>
      <h1>
        {username}'s {type === 'followers' ? 'Followers' : 'Following'}
      </h1>
      {loading && <p>Loading...</p>}
      {!loading && users.length === 0 && (
        <p>No {type} yet!</p>
      )}
      <div className={styles.userList}>
        {users.map(u => (
          <UserCard
            key={u.id}
            name={u.username}
            avatar={u.profile_image || '/blank_profile-512x512.jpg'}
            onClick={() => navigate(`/user/${u.username}`)}
          />
        ))}
      </div>
    </div>
  );
}