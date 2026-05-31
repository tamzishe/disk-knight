const COLLECTION_KEY = 'diskknight_collection';
const LISTENED_KEY = 'diskknight_listened';

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

export function getListened() {
  const data = localStorage.getItem(LISTENED_KEY);
  return data ? JSON.parse(data) : [];
}

export function addToListened(album) {
  const listened = getListened();
  if (listened.find(a => a.id === album.id)) return;
  listened.push(album);
  localStorage.setItem(LISTENED_KEY, JSON.stringify(listened));
}

export function removeFromListened(albumId) {
  const listened = getListened().filter(a => a.id !== albumId);
  localStorage.setItem(LISTENED_KEY, JSON.stringify(listened));
}

export function isListened(albumId) {
  return getListened().some(a => a.id === albumId);
}