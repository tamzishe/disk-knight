import { supabase } from '../func/supabase';

export async function createUser(id, username) {
  console.log("creating user:", id, username);
  const { error } = await supabase
    .from('users')
    .insert({ id, username });
  if (error) console.error("createUser error:", error);
  return error;
}
export async function getUsername(userId) {
  const { data, error } = await supabase
    .from('users')
    .select('username')
    .eq('id', userId)
    .single();
  if (error) console.error(error);
  return data?.username || null;
}