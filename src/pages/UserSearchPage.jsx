import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { searchUsers } from "../supabase/users.js";
import UserCard from "../components/UserCard/UserCard";
import HomeButton from "../components/Buttons/HomeButton";
import Header from "../components/Header/Header";
import styles from "../css/UserSearchPage.module.css";

export default function UserSearchPage() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const [query, setQuery] = useState("");
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
		<div className="page">
			<Header title="Search Users" />
			<div className={styles.searchSection}>
				<div className={styles.inputWrapper}>
					<span className={styles.searchIcon}>🔍</span>
					<input
						className={styles.input}
						type="text"
						placeholder="Username..."
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") handleSearch();
						}}
					/>
				</div>
				<button className={styles.enterBtn} onClick={handleSearch}>
					Enter
				</button>
			</div>
			{loading && <p className={styles.empty}>Searching...</p>}
			{searched && results.length === 0 && (
				<p className={styles.empty}>No users found!</p>
			)}
			<div className={styles.userList}>
				{results.map((u) => (
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
