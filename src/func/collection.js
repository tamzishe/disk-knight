const COLLECTION_KEY = 'diskknight_collection';

export function getCollection() {
  const data = localStorage.getItem(COLLECTION_KEY);
  return data ? JSON.parse(data) : [];
}

export function addToCollection(album) {
  const collection = getCollection();
  if (collection.find(a => a.id === album.id)) return; // no duplicates
  collection.push(album);
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
}

export function removeFromCollection(albumId) {
  const collection = getCollection().filter(a => a.id !== albumId);
  localStorage.setItem(COLLECTION_KEY, JSON.stringify(collection));
}

export function isInCollection(albumId) {
  return getCollection().some(a => a.id === albumId);
}