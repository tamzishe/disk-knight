import { supabase } from '../../func/supabase';

export async function getRating(userId, albumId) {
  const { data, error } = await supabase
    .from('ratings')
    .select()
    .eq('user_id', userId)
    .eq('album_id', albumId)
    .single();
  if (error) return null;
  return data?.rating || null;
}

export async function saveRating(userId, albumId, rating) {
  const { error } = await supabase
    .from('ratings')
    .upsert({ user_id: userId, album_id: albumId, rating });
  if (error) console.error(error);
}