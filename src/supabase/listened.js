import { supabase } from '../func/supabase';

export async function getListened(userId) {
  const { data, error } = await supabase
    .from('listened')
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
  console.log("listened data:", data);
  console.log("listened error:", error);
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

export async function addToListened(userId, albumId) {
  const { error } = await supabase
    .from('listened')
    .insert({ user_id: userId, album_id: albumId });
  if (error) console.error(error);
}

export async function removeFromListened(userId, albumId) {
  const { error } = await supabase
    .from('listened')
    .delete()
    .eq('user_id', userId)
    .eq('album_id', albumId);
  if (error) console.error(error);
}

export async function isListened(userId, albumId) {
  const { data, error } = await supabase
    .from('listened')
    .select()
    .eq('user_id', userId)
    .eq('album_id', albumId);
  if (error) console.error(error);
  return data && data.length > 0;
}