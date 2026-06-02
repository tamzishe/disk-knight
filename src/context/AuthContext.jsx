import { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "../func/supabase";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
	const [session, setSession] = useState(null);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);
	const [username, setUsername] = useState(null);

	useEffect(() => {
		supabase.auth.getSession().then(({ data: { session } }) => {
			setSession(session);
			setUser(session?.user || null);
			setLoading(false);
		});

		const {
			data: { subscription },
		} = supabase.auth.onAuthStateChange((_event, session) => {
			setSession(session);
			setUser(session?.user || null);
		});

		return () => subscription.unsubscribe();
	}, []);
	if (session?.user) {
		getUsername(session.user.id).then((name) => setUsername(name));
	}
	return (
		<AuthContext.Provider value={{ session, user, username, loading }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
