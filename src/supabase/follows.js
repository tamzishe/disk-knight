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
    .maybeSingle();
  if (error) return false;
  return !!data;
}

export async function getFollowers(userId) {
  const { data, error } = await supabase
    .from('follows')
    .select(`
      *,
      users!follows_follower_id_fkey (
        id,
        username,
        profile_image
      )
    `)
    .eq('following_id', userId);
  if (error) console.error(error);
  return data?.map(item => item.users) || [];
}

export async function getFollowing(userId) {
  const { data, error } = await supabase
    .from('follows')
    .select(`
      *,
      users!follows_following_id_fkey (
        id,
        username,
        profile_image
      )
    `)
    .eq('follower_id', userId);
  if (error) console.error(error);
  return data?.map(item => item.users) || [];
}

export async function getFollowerCount(userId) {
  const { count, error } = await supabase
    .from('follows')
    .select('*', { count: 'exact', head: true })
    .eq('following_id', userId);
  if (error) console.error(error);
  return count || 0;
}

export async function getFollowingCount(userId) {
  const { count, error } = await supabase
    .from('follows')
    .select('*', { count: 'exact', head: true })
    .eq('follower_id', userId);
  if (error) console.error(error);
  return count || 0;
}