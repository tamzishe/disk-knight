import { useState } from "react";
import { supabase } from "../func/supabase";
import { createUser } from "../supabase/users";
import styles from "../css/LoginPage.module.css";

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [isSignUp, setIsSignUp] = useState(false);
	const [message, setMessage] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage("");

		if (isSignUp) {
			const { data, error } = await supabase.auth.signUp({
				email,
				password,
				options: {
					emailRedirectTo: window.location.origin,
				},
			});
			if (error) {
				setMessage(error.message);
				setLoading(false);
				return;
			}
			const userError = await createUser(data.user.id, username);
			if (userError) setMessage("Failed to create user account. Please try again.");
			else setMessage("Check your email to verify your account!");
		} else {
			const { error } = await supabase.auth.signInWithPassword({
				email,
				password,
			});
			if (error) setMessage(error.message);
		}

		setLoading(false);
	};

	return (
		<div className="page">
			<div className={styles.card}>
				<img
					src="/icon-192x192.png"
					alt="Logo"
					className={styles.logo}
				/>
				<h1 className={styles.title}>DiskKnight</h1>
				<h2 className={styles.subtitle}>
					{isSignUp ? "Create Account" : "Sign In"}
				</h2>
				<form className={styles.form} onSubmit={handleSubmit}>
					{isSignUp && (
						<input
							className={styles.input}
							type="text"
							placeholder="Username"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							required
						/>
					)}
					<input
						className={styles.input}
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<input
						className={styles.input}
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<button className={styles.submitBtn} disabled={loading}>
						{loading
							? "Loading..."
							: isSignUp
								? "Sign Up"
								: "Sign In"}
					</button>
				</form>
				{message && <p className={styles.message}>{message}</p>}
				<button
					className={styles.toggleBtn}
					onClick={() => setIsSignUp(!isSignUp)}
				>
					{isSignUp
						? "Already have an account? Sign In"
						: "Don't have an account? Sign Up"}
				</button>
			</div>
		</div>
	);
}
