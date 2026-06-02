import { supabase } from '../func/supabase';

export async function getListened(userId) {
  const { data, error } = await supabase
    .from('listened')
    .select()
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