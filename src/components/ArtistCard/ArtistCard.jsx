export default function ArtistCard({ name, disambiguation, image, id, onSelect }) {
  return ( //onClick={() => onSelect(id)}
    <div >
      <img src={image} alt={name} />
      <h2>{name}</h2>
      {disambiguation && <p>{disambiguation}</p>}
    </div>
  );
}