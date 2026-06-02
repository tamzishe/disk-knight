import { supabase } from '../func/supabase';


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
  console.log("saveRating called:", userId, albumId, rating);
  const { data, error } = await supabase
    .from('ratings')
    .upsert(
      { user_id: userId, album_id: albumId, rating },
      { onConflict: 'user_id, album_id' }
    );
  console.log("saveRating result:", data, error);
  if (error) console.error("saveRating error:", error);
}