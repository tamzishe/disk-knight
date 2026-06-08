import { supabase } from "../func/supabase";

export async function createUser(id, username) {
	console.log("creating user:", id, username);
	const { error } = await supabase.from("users").insert({ id, username });
	if (error) console.error("createUser error:", error);
	return error;
}
export async function getUsername(userId) {
	const { data, error } = await supabase
		.from("users")
		.select("username")
		.eq("id", userId)
		.single();
	if (error) console.error(error);
	return data?.username || null;
}
export async function getProfileImage(username) {
	const { data, error } = await supabase
		.from("users")
		.select("profile_image")
		.eq("username", username)
		.single();
	if (error) console.error(error);
	return data?.profile_image || null;
}
export async function getIdFromUsername(username) {
	const { data, error } = await supabase
		.from("users")
		.select("id")
		.eq("username", username)
		.single();
	if (error) console.error(error);
	return data?.id || null;
}
export async function getUserProfile(username) {
  const { data, error } = await supabase
    .from('users')
    .select('id, username, profile_image, description')
    .eq('username', username)
    .single();
  if (error) console.error(error);
  return data || null;
}

export async function searchUsers(query) {
  const { data, error } = await supabase
    .from('users')
    .select('id, username, profile_image')
    .ilike('username', `%${query}%`) // case-insensitive search
	.order('username', { ascending: true })
    .limit(10);
  if (error) console.error(error);
  return data || [];
}

