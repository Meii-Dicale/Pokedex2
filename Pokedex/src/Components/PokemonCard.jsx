
import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router-dom';

function PokemonCard({pokemon}) {

    


    return (
      <Card style={{ width: '18rem',
        backgroundColor: 'rgba(240, 248, 255, 0.631)',
        borderRadius: '8%' 
       }} >
        <Card.Img style={{borderRadius: '30px', width: '150px'}} variant="top" src={"https://img.pokemondb.net/artwork/"+pokemon.name+".jpg"} />

        
        <Card.Body >
          <Card.Title >{pokemon.name}</Card.Title>
        </Card.Body>
      </Card>
    );
}

export default PokemonCard;