import { useParams, Link } from "react-router-dom";

const SongDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Detalhes da Música {id}</h1>
      <Link to={`/musica/${id}/letra`}>Ler a Letra</Link>
    </div>
  );
};

export default SongDetails;
