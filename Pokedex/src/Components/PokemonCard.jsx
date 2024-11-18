import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function PokemonCard({ pokemon }) {
    const navigate = useNavigate();
    const navigateTo = () => {
        
        navigate(`/pokemon/${pokemon.name}`, { state: pokemon });
    };
  return (
    <Card   
      style={{
        width: '18rem',
        backgroundColor: 'rgba(240, 248, 255, 0.631)',
        borderRadius: '8%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center', // Centre horizontalement
        justifyContent: 'center', // Centre verticalement
      }} 
      onClick={ () => navigateTo()}
    >
      {/* Image */}
      <Card.Img 
        style={{
          borderRadius: '30px',
          height: '120px',
          width: '120px',
          margin: 'auto' // Centre horizontalement
        }} 
        variant="top" 
        src={"https://img.pokemondb.net/artwork/" + pokemon.name + ".jpg"} 
      />

      {/* Body */}
      <Card.Body>
        <Card.Title 
          className="d-flex align-content-around justify-content-center"
        >
          {pokemon.name.toUpperCase()}
          
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default PokemonCard;
