const RATINGS = [
  { label: 'Perfect', value: 10, color: '#1D9E75' },
  { label: 'Excellent', value: 9, color: '#185FA5' },
  { label: 'Amazing', value: 8, color: '#534AB7' },
  { label: 'Great', value: 7, color: '#D4537E' },
  { label: 'Good', value: 6, color: '#EF9F27' },
  { label: 'Mid', value: 5, color: '#D85A30' },
  { label: 'Bad', value: 0, color: '#E24B4A' },
];

export function getRatings() {
  return RATINGS;
}

export function getRatingByLabel(label) {
  return RATINGS.find(r => r.label === label);
}

export function getRatingByValue(value) {
  return RATINGS.find(r => r.value === value);
}

export function saveRating(albumId, label) {
  // update the rating on the album in both collection and listened
  updateRatingInStorage('diskknight_collection', albumId, label);
  updateRatingInStorage('diskknight_listened', albumId, label);
}

export function getRating(albumId) {
  // check collection first, then listened
  const collection = JSON.parse(localStorage.getItem('diskknight_collection') || '[]');
  const album = collection.find(a => a.id === albumId);
  if (album?.rating) return album.rating;

  const listened = JSON.parse(localStorage.getItem('diskknight_listened') || '[]');
  const listenedAlbum = listened.find(a => a.id === albumId);
  return listenedAlbum?.rating || null;
}

function updateRatingInStorage(key, albumId, label) {
  const data = JSON.parse(localStorage.getItem(key) || '[]');
  const index = data.findIndex(a => a.id === albumId);
  if (index !== -1) {
    data[index].rating = label;
    localStorage.setItem(key, JSON.stringify(data));
  }
}