export default function SortBar({ sortBy, setSortBy }) {
  return (
    <div>
      <button 
        onClick={() => setSortBy('date')}
        style={{ fontWeight: sortBy === 'date' ? 'bold' : 'normal' }}
      >
        Date Added
      </button>
      <button 
        onClick={() => setSortBy('title')}
        style={{ fontWeight: sortBy === 'title' ? 'bold' : 'normal' }}
      >
        Title
      </button>
      <button 
        onClick={() => setSortBy('rating')}
        style={{ fontWeight: sortBy === 'rating' ? 'bold' : 'normal' }}
      >
        Rating
      </button>
    </div>
  );
}