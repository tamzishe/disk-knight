// import { useAuth } from '../context/AuthContext';
import { addToCollection, removeFromCollection, isInCollection } from '../supabase/collection';
import { addToListened, removeFromListened, isListened } from '../supabase/listened';
import { cacheAlbum } from '../supabase/albums';

export async function handleCollect(userId, album, onDone) {
  console.log("handleCollect called", userId, album.id);
  const collected = await isInCollection(userId, album.id);
  console.log("isInCollection:", collected);
  if (collected) {
    await removeFromCollection(userId, album.id);
    console.log("removed from collection");
  } else {
    await cacheAlbum(album);
    console.log("cached album");
    await addToCollection(userId, album.id);
    console.log("added to collection");
  }
  if (onDone) onDone();
}

export async function handleListen(userId, album, onDone) {
  const listened = await isListened(userId, album.id);
  if (listened) {
    await removeFromListened(userId, album.id);
  } else {
    await cacheAlbum(album);
    await addToListened(userId, album.id);
  }
  if (onDone) onDone();
}