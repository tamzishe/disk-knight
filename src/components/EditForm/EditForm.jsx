import { useState } from "react";
import { supabase } from "../../func/supabase";
import { useAuth } from "../../context/AuthContext";
import styles from "./EditForm.module.css";

export default function EditForm({ currentProfile, onSave, onClose }) {
	const { user } = useAuth();
	const [description, setDescription] = useState(
		currentProfile?.description || "",
	);
	const [profileImage, setProfileImage] = useState(null);
	const [preview, setPreview] = useState(
		currentProfile?.profile_image || null,
	);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");

	const handleImageChange = (e) => {
		const file = e.target.files[0];
		if (!file) return;
		setProfileImage(file);
		setPreview(URL.createObjectURL(file)); // show preview immediately
	};

	const uploadImage = async () => {
		if (!profileImage) return currentProfile?.profile_image || null;
		const fileExt = profileImage.name.split(".").pop();
		const filePath = `${user.id}.${fileExt}`;
		const { error } = await supabase.storage
			.from("profile-images")
			.upload(filePath, profileImage, { upsert: true });
		if (error) {
			console.error(error);
			return null;
		}
		const { data } = supabase.storage
			.from("profile-images")
			.getPublicUrl(filePath);
		return data.publicUrl;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage("");

		const imageUrl = await uploadImage();
		console.log("imageUrl:", imageUrl);

		const { data, error } = await supabase
			.from("users")
			.update({ description, profile_image: imageUrl })
			.eq("id", user.id)
			.select();
		console.log("update result:", data, error);
		console.log("user.id:", user.id);

		if (error) {
			setMessage(error.message);
		} else {
			setMessage("Profile updated!");
			if (onSave) onSave({ description, profile_image: imageUrl });
		}
		setLoading(false);
	};

	return (
		<div className={styles.overlay} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<h2>Edit Profile</h2>
				<form onSubmit={handleSubmit}>
					<p>Username</p>
					<input
						type="text"
						value={currentProfile?.username || ""}
						disabled
					/>
					<p>Profile Picture</p>
					{preview && (
						<img
							src={preview}
							alt="Profile preview"
							style={{
								width: "100px",
								height: "100px",
								objectFit: "cover",
								borderRadius: "50%",
							}}
						/>
					)}
					<input
						type="file"
						accept="image/*"
						onChange={handleImageChange}
					/>
					<p>Description</p>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Tell us about yourself..."
					/>
					<button disabled={loading}>
						{loading ? "Saving..." : "Save"}
					</button>
				</form>
				{message && <p>{message}</p>}
			</div>
		</div>
	);
}
