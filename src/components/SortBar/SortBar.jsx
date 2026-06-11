import styles from './SortBar.module.css';

export default function SortBar({ sortBy, setSortBy }) {
  return (
    <div className={styles.container}>
      <span className={styles.label}>Sort By</span>
      <div className={styles.pills}>
        <button
          className={sortBy === 'date' ? styles.pillActive : styles.pill}
          onClick={() => setSortBy('date')}
        >
          Date
        </button>
        <button
          className={sortBy === 'title' ? styles.pillActive : styles.pill}
          onClick={() => setSortBy('title')}
        >
          Title
        </button>
        <button
          className={sortBy === 'rating' ? styles.pillActive : styles.pill}
          onClick={() => setSortBy('rating')}
        >
          Rating
        </button>
      </div>
    </div>
  );
}