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
  if (error) console.error(error);
  return data?.map(item => ({
    id: item.albums.id,
    title: item.albums.title,
    artist: item.albums.artist,
    cover: item.albums.cover_url,
    releaseDate: item.albums.release_date,
  })) || [];
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