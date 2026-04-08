import { useParams, Link } from "react-router-dom";

const SongLyrics = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Letra da Música {id}</h1>
      <Link to="/compartilhar">Compartilhar Passagem</Link>
    </div>
  );
};

export default SongLyrics;
