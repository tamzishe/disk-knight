import { supabase } from '../func/supabase';

export async function getCollection(userId) {
  const { data, error } = await supabase
    .from('collection')
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
  console.log("collection data:", data);
  console.log("collection error:", error);
  return data?.map(item => {
  if (!item.albums) return null; // skip if no album found
    return {
      id: item.albums.id,
      title: item.albums.title,
      artist: item.albums.artist,
      cover: item.albums.cover_url,
      releaseDate: item.albums.release_date,
    };
  }).filter(Boolean) || []; 
  }

export async function addToCollection(userId, albumId) {
  const { error } = await supabase
    .from('collection')
    .insert({ user_id: userId, album_id: albumId });
  if (error) console.error(error);
}

export async function removeFromCollection(userId, albumId) {
  const { error } = await supabase
    .from('collection')
    .delete()
    .eq('user_id', userId)
    .eq('album_id', albumId);
  if (error) console.error(error);
}

export async function isInCollection(userId, albumId) {
  const { data, error } = await supabase
    .from('collection')
    .select()
    .eq('user_id', userId)
    .eq('album_id', albumId);
  if (error) console.error(error);
  return data && data.length > 0;
}