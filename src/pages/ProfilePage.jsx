import BackButton from "../components/Buttons/BackButton.jsx";
import { supabase } from "../func/supabase.js";
import { getUserProfile } from "../supabase/users.js";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { followUser, unfollowUser, isFollowing } from "../supabase/follows.js";
import EditForm from "../components/EditForm/EditForm.jsx";

export default function ProfilePage() {
	const { user: activeUser, username: activeUsername } = useAuth();
	const { username: profileUsername } = useParams();
	const navigate = useNavigate();

	const [currentProfile, setCurrentProfile] = useState(null);
	const [isFollowingBool, setIsFollowingBool] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

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
		<div>
			<h1>Profile</h1>
			<img
				src={
					currentProfile?.profile_image ||
					"/blank_profile-512x512.jpg"
				}
				alt="Profile Picture"
			/>
			<h2>{currentProfile?.username || profileUsername}</h2>
			<p>{currentProfile?.description || "No description provided."}</p>
			<BackButton />
			<p>This is where user profile information will be displayed.</p>
			{isOwnProfile && (
				<button onClick={handleEditProfile}>Edit Profile</button>
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
			{!isOwnProfile && !isFollowingBool && (
				<button onClick={handleFollow}>Follow</button>
			)}
			{!isOwnProfile && isFollowingBool && (
				<button onClick={handleUnfollow}>Unfollow</button>
			)}
			<button onClick={handleGoToCollection}>
				{currentProfile?.username || profileUsername}'s Collection
			</button>
			<button onClick={handleGoToListened}>
				{currentProfile?.username || profileUsername}'s Listened
			</button>
			{isOwnProfile && (
				<button onClick={handleSignOut}>Sign Out</button>
			)}
		</div>
	);
}
