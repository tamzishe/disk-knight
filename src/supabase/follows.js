import { supabase } from "../func/supabase";

export async function followUser(currentUserId, targetUserId) {
  const { error } = await supabase
    .from('follows')
    .insert({ follower_id: currentUserId, following_id: targetUserId });
  if (error) console.error(error);
  return error;
}

export async function unfollowUser(currentUserId, targetUserId) {
  const { error } = await supabase
    .from('follows')
    .delete()
    .eq('follower_id', currentUserId)
    .eq('following_id', targetUserId);
  if (error) console.error(error);
  return error;
}

export async function isFollowing(currentUserId, targetUserId) {
  const { data, error } = await supabase
    .from('follows')
    .select('*')
    .eq('follower_id', currentUserId)
    .eq('following_id', targetUserId)
    .single();
  if (error) return false;
  return !!data;
}