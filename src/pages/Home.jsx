import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <div className="Header">
        <img src="/icon-192x192.png" alt="Logo" className="logo" />
        <h1>Disk Knight</h1>
      </div>
      <h1>Welcome to Disk Knight</h1>
      <p>What would you like to do?</p>
      <button onClick={() => navigate('/album-search')}>Search Albums</button>
      {/* <button onClick={() => navigate('/artist-search')}>Search Artists</button> */}
      <button onClick={() => navigate('/collection/currentUser')}>My Collection</button>
      <button onClick={() => navigate('/listened/currentUser')}>Listened</button>
    </div>
  );
}