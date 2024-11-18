import { useLocation, useParams } from 'react-router-dom';
import '../App.css';
import PokemonCard from '../Components/PokemonCard';
import PokemonDetail from '../Services/PokemonDetail';
import { useEffect, useState } from 'react';
import Pokedex from '../Components/PokedexCard';
const PokedexPage = () => {
    const location = useLocation ();
    const [PokeDetail, setPokeDetail] = useState ();
    

    const fetchPokemonDetail = async () => {
        try {
           const response = await PokemonDetail.getPokemonDetail(location.state.url)
           console.log(response.data);
           setPokeDetail(response.data);
        } catch (error) {
            
        }

    }

    useEffect(() => {
        fetchPokemonDetail();
      }, []);

return <>
<div className="pokedex-bg">

<Pokedex PokeDetail={PokeDetail}>




</Pokedex>

</div>



</>
}
export default PokedexPage;