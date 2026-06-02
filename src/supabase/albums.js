import { supabase } from '../func/supabase';

export async function getAlbum(albumId) {
  const { data, error } = await supabase
    .from('albums')
    .select()
    .eq('id', albumId)
    .single();
  if (error) return null;
  return data;
}

export async function cacheAlbum(album) {
  const { error } = await supabase
    .from('albums')
    .upsert({
      id: album.id,
      title: album.title,
      artist: album.artist,
      cover_url: album.cover,
      release_date: album.releaseDate,
    });
  if (error) console.error(error);
}