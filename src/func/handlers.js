import { 
  addToCollection, 
  removeFromCollection, 
  isInCollection,
  addToListened, 
  removeFromListened, 
  isListened 
} from './collection';

export function handleCollect(album, onDone) {
  if (isInCollection(album.id)) {
    removeFromCollection(album.id);
  } else {
    addToCollection(album);
  }
  if (onDone) onDone();
}

export function handleListen(album, onDone) {
  if (isListened(album.id)) {
    removeFromListened(album.id);
  } else {
    addToListened(album);
  }
  if (onDone) onDone();
}