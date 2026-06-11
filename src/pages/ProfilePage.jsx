import BackButton from "../components/Buttons/BackButton.jsx";
import { supabase } from "../func/supabase.js";
import { getUserProfile } from "../supabase/users.js";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { followUser, unfollowUser, isFollowing } from "../supabase/follows.js";
import EditForm from "../components/EditForm/EditForm.jsx";
import Header from '../components/Header/Header';
import { getFollowerCount, getFollowingCount } from "../supabase/follows.js";
import styles from "../css/ProfilePage.module.css";

export default function ProfilePage() {
	const { user: activeUser, username: activeUsername } = useAuth();
	const { username: profileUsername } = useParams();
	const navigate = useNavigate();

	const [currentProfile, setCurrentProfile] = useState(null);
	const [isFollowingBool, setIsFollowingBool] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [followerCount, setFollowerCount] = useState(0);
	const [followingCount, setFollowingCount] = useState(0);
	useEffect(() => {
		async function loadProfile() {
			const currentProfile = await getUserProfile(profileUsername);
			setCurrentProfile(currentProfile);
			console.log("currentProfile:", currentProfile);
		}
		loadProfile();
	}, [profileUsername]);

	useEffect(() => {
		async function checkFollowing() {
			if (!activeUser || !currentProfile) return;
			const following = await isFollowing(
				activeUser.id,
				currentProfile.id,
			);
			setIsFollowingBool(following);
		}
		checkFollowing();
	}, [currentProfile]);

	useEffect(() => {
		async function loadCounts() {
			if (!currentProfile) return;
			const [followerCount, followingCount] = await Promise.all([
				getFollowerCount(currentProfile.id),
				getFollowingCount(currentProfile.id)
			]);
			setFollowerCount(followerCount);
			setFollowingCount(followingCount);
		}
		loadCounts();
	}, [currentProfile]);

	const handleGoToCollection = () => {
		navigate(`/collection/${profileUsername}`);
	};

	const handleGoToListened = () => {
		navigate(`/listened/${profileUsername}`);
	};
	const handleFollow = () => {
		followUser(activeUser.id, currentProfile.id);
		setIsFollowingBool(true);
	};
	const handleUnfollow = () => {
		unfollowUser(activeUser.id, currentProfile.id);
		setIsFollowingBool(false);
	};
	const handleEditProfile = () => {
		setIsEditing(true);
	};
	const handleSignOut = async () => {
		await supabase.auth.signOut();
		navigate("/login");
	};

	const isOwnProfile = activeUsername === profileUsername;
	if (!currentProfile) return null; // some sort of loading animation could be put here later
	return (
    <div className="page">
        <Header />
        
        <div className={styles.profileSection}>
            <img
                className={styles.avatar}
                src={currentProfile?.profile_image || "/blank_profile-512x512.jpg"}
                alt="Profile Picture"
            />
            <div className={styles.profileInfo}>
                <h2 className={styles.username}>{currentProfile?.username || profileUsername}</h2>
                <div className={styles.profileActions}>
                    {isOwnProfile && (
                        <button className={styles.actionBtn} onClick={handleEditProfile}>
                            Edit Profile
                        </button>
                    )}
                    {!isOwnProfile && !isFollowingBool && (
                        <button className={styles.actionBtn} onClick={handleFollow}>
                            Follow
                        </button>
                    )}
                    {!isOwnProfile && isFollowingBool && (
                        <button className={styles.actionBtnActive} onClick={handleUnfollow}>
                            Unfollow
                        </button>
                    )}
                </div>
            </div>
        </div>

        <hr className={styles.divider} />

        <div className={styles.followRow}>
            <button className={styles.followBtn} onClick={() => navigate(`/user/${profileUsername}/following`)}>
                {followingCount} Following
            </button>
            <button className={styles.followBtn} onClick={() => navigate(`/user/${profileUsername}/followers`)}>
                {followerCount} Followers
            </button>
        </div>

        {currentProfile?.description && (
            <p className={styles.description}>{currentProfile.description}</p>
        )}

        <div className={styles.listButtons}>
            <button className={styles.listBtn} onClick={handleGoToCollection}>
                {profileUsername}'s Collection
            </button>
            <button className={styles.listBtn} onClick={handleGoToListened}>
                {profileUsername}'s Listened
            </button>
        </div>

        {isOwnProfile && (
            <button className={styles.signOutBtn} onClick={handleSignOut}>
                Sign Out
            </button>
        )}

        {isEditing && (
            <EditForm
                currentProfile={currentProfile}
                onSave={(updated) => {
                    setCurrentProfile({ ...currentProfile, ...updated });
                    setIsEditing(false);
                }}
                onClose={() => setIsEditing(false)}
            />
        )}
    </div>
);
}
