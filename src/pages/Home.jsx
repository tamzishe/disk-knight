import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getCollection } from "../supabase/collection.js";
import { getListened } from "../supabase/listened.js";
import { getRatingsForUser } from "../supabase/ratings.js";
import { getRatingByLabel } from "../func/ratings.js";
import { getProfileImage } from "../supabase/users.js";
import AlbumCard from "../components/AlbumCard/AlbumCard";
import styles from "../css/Home.module.css";

export default function Home() {
	const { user, username } = useAuth();
	const navigate = useNavigate();
	const [collection, setCollection] = useState([]);
	const [listened, setListened] = useState([]);
	const [ratings, setRatings] = useState({});
	const [profileImage, setProfileImage] = useState(null);

	useEffect(() => {
		async function load() {
			if (!user) return;
			const [col, lis, rat, img] = await Promise.all([
				getCollection(user.id),
				getListened(user.id),
				getRatingsForUser(user.id),
				getProfileImage(username),
			]);
			setCollection(col.slice(0, 10));
			setListened(lis.slice(0, 10));
			setRatings(rat);
			setProfileImage(img);
		}
		load();
	}, [user]);
	const handleWheel = (e) => {
		e.currentTarget.scrollLeft += e.deltaY;
	};

	return (
		<div className={styles.page}>
			<header className={styles.header}>
				<div className={styles.headerLeft}>
					<img
						src="/icon-192x192.png"
						alt="Logo"
						className={styles.logo}
					/>
					<span className={styles.logoText}>DiskKnight</span>
				</div>
				<img
					src={profileImage || "/blank_profile-512x512.jpg"}
					alt="Profile"
					className={styles.avatar}
					onClick={() => navigate(`/user/${username}`)}
				/>
			</header>

			<div className={styles.searchButtons}>
				<button
					className={styles.searchBtn}
					onClick={() => navigate("/album-search")}
				>
					🔍 Albums
				</button>
				<button
					className={styles.searchBtn}
					onClick={() => navigate("/user-search")}
				>
					🔍 Users
				</button>
			</div>

			<section className={styles.section}>
				<div className={styles.sectionHeader}>
					<h2 className={styles.sectionTitle}>Collection</h2>
					<button
						className={styles.seeAll}
						onClick={() => navigate(`/collection/${username}`)}
					>
						See all
					</button>
				</div>
				{collection.length === 0 ? (
					<p className={styles.empty}>Nothing here yet!</p>
				) : (
					<div className={styles.cardRow}
						onWheel={handleWheel}
					>
						{collection.map((album) => (
							<div
								key={album.id}
								onClick={() =>
									navigate(`/collection/${username}`)
								}
							>
								<AlbumCard
									small
									title={album.title}
									cover={album.cover}
									albumId={album.id}
								/>
							</div>
						))}
					</div>
				)}
			</section>

			<section className={styles.section}>
				<div className={styles.sectionHeader}>
					<h2 className={styles.sectionTitle}>Listened</h2>
					<button
						className={styles.seeAll}
						onClick={() => navigate(`/listened/${username}`)}
					>
						See all
					</button>
				</div>
				{listened.length === 0 ? (
					<p className={styles.empty}>Nothing here yet!</p>
				) : (
					<div className={styles.cardRow} onWheel={handleWheel}>
						{listened.map((album) => (
							<div
								key={album.id}
								onClick={() =>
									navigate(`/listened/${username}`)
								}
							>
								<AlbumCard
									small
									title={album.title}
									cover={album.cover}
									albumId={album.id}
								/>
							</div>
						))}
					</div>
				)}
			</section>

			<div className={styles.bottomButtons}>
				<button
					className={styles.bottomBtn}
					onClick={() => navigate("/want")}
				>
					Want
				</button>
				<button
					className={styles.bottomBtn}
					onClick={() => navigate("/listen-later")}
				>
					Later
				</button>
			</div>
		</div>
	);
}
