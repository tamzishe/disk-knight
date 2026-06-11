import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserProfile } from "../supabase/users.js";
import { getFollowers, getFollowing } from "../supabase/follows.js";
import UserCard from "../components/UserCard/UserCard";
import Header from "../components/Header/Header";
import styles from "../css/FollowPage.module.css";

export default function FollowPage() {
	const { username, type } = useParams();
	const navigate = useNavigate();
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function load() {
			const profile = await getUserProfile(username);
			if (!profile) return;
			const data =
				type === "followers"
					? await getFollowers(profile.id)
					: await getFollowing(profile.id);
			setUsers(data);
			setLoading(false);
		}
		load();
	}, [username, type]);

	return (
		<div className="page">
			<Header
				showBack
				backTo={`/user/${username}`}
				title={`${username}'s ${type === "followers" ? "Followers" : "Following"}`}
			/>
			{loading && <p className={styles.empty}>Loading...</p>}
			{!loading && users.length === 0 && (
				<p className={styles.empty}>No {type} yet!</p>
			)}
			<div className={styles.userList}>
				{users.map((u) => (
					<UserCard
						key={u.id}
						name={u.username}
						avatar={u.profile_image || "/blank_profile-512x512.jpg"}
						onClick={() => navigate(`/user/${u.username}`)}
					/>
				))}
			</div>
		</div>
	);
}
