import { useNavigate } from 'react-router-dom';

export default function Home() {
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
      <button onClick={() => navigate('/artist-search')}>Search Artists</button>
      <button onClick={() => navigate('/collection/currentUser')}>My Collection</button>
    </div>
  );
}