import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import styles from './Header.module.css';
import { useState, useEffect } from 'react';
import { getProfileImage } from '../../supabase/users.js';

export default function Header({ showBack, backTo, title }) {
  const { user, username } = useAuth();
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState(null);
  useEffect(() => {
		async function load() {
			if (!user) return;
			const img = await getProfileImage(username);
			setProfileImage(img);
		}
		load();
	}, [user]);

  return (
    <header className={styles.header}>
      <div className={styles.left}>
        {showBack ? (
          <button className={styles.back} onClick={() => navigate(backTo || -1)}>
            ←
          </button>
        ) : (
          <div className={styles.logoGroup} onClick={() => navigate('/')}>
            <img src="/icon-192x192.png" alt="Logo" className={styles.logo} />
            <span className={styles.logoText}>DiskKnight</span>
          </div>
        )}
      </div>
      {title && <h1 className={styles.title}>{title}</h1>}
      <div className={styles.right}>
        <img
          src={profileImage || "/blank_profile-512x512.jpg"}
          alt="Profile"
          className={styles.avatar}
          onClick={() => navigate(`/user/${username}`)}
        />
      </div>
    </header>
  );
}