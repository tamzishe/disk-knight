import { supabase } from '../func/supabase';

export async function getWant(userId) {
  const { data, error } = await supabase
    .from('want')
    .select(`
      *,
      albums (
        id,
        title,
        artist,
        cover_url,
        release_date
      )
    `)
    .eq('user_id', userId);
  if (error) console.error(error);
  return data?.map(item => {
    if (!item.albums) return null;
    return {
      id: item.albums.id,
      title: item.albums.title,
      artist: item.albums.artist,
      cover: item.albums.cover_url,
      releaseDate: item.albums.release_date,
    };
  }).filter(Boolean) || [];
}

export async function addToWant(userId, albumId) {
  const { error } = await supabase
    .from('want')
    .insert({ user_id: userId, album_id: albumId });
  if (error) console.error(error);
}

export async function removeFromWant(userId, albumId) {
  const { error } = await supabase
    .from('want')
    .delete()
    .eq('user_id', userId)
    .eq('album_id', albumId);
  if (error) console.error(error);
}

export async function isInWant(userId, albumId) {
  const { data, error } = await supabase
    .from('want')
    .select()
    .eq('user_id', userId)
    .eq('album_id', albumId);
  if (error) console.error(error);
  return data && data.length > 0;
}