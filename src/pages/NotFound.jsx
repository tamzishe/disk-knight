import { useNavigate } from 'react-router-dom';
import styles from '../css/NotFound.module.css';

export default function NotFound() {
    const navigate = useNavigate();
    return (
        <div className="page">
            <img src="/icon-192x192.png" alt="Logo" className={styles.logo} />
            <h1 className={styles.title}>808s Not Found</h1>
            <button className={styles.btn} onClick={() => navigate('/')}>
                Home
            </button>
        </div>
    );
}