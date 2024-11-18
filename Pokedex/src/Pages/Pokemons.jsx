import { useEffect, useState } from "react"
import PokemonService from "../Services/PokemonService"
import PokemonCard from "../Components/PokemonCard";
import Container from "react-bootstrap/esm/Container";
import Pagination from "react-bootstrap/esm/Pagination";


const PokemonPage= () =>{
    const [currentPage, setCurrentPage] = useState(1);
    const [limit, setLimit] = useState(21); 
    const [maxPage, setMaxPage] = useState(250); 

const [pokemons, setPokemons] = useState([])
const fetchPokemons = async () => {

    try {
        const offset = (currentPage - 1) * limit
        const response = await PokemonService.getAllPokemons(offset, limit);
        setPokemons(response.data.results);
        setMaxPage(response.data.count / limit)

        console.log(response.data.results[0])
    } catch (error) {
        console.error(error)
    }
}
useEffect(() => {
    fetchPokemons();
}, []);


return <>

<div className="background-container">
          <Container>
            <div className="d-flex flex-row flex-wrap justify-content-center gap-5 mt-5">
              {pokemons.map((pokemon) => (
                <PokemonCard pokemon={pokemon} key={pokemon.name} />
              ))}
            </div>
          </Container>
        </div>

        <Pagination className="mt-5">
            {currentPage > 1 && <>
                <Pagination.First onClick={() => { setCurrentPage(1) }} />
                <Pagination.Prev onClick={() => { setCurrentPage(currentPage - 1) }} />
                <Pagination.Item onClick={() => { setCurrentPage(1) }}>{1}</Pagination.Item>

            </>}

            {currentPage - 5 > 0 && <>
                <Pagination.Ellipsis onClick={() => { setCurrentPage(currentPage - 5) }} />
            </>
            }
            {(currentPage != 2 && currentPage > 1) && <>
                <Pagination.Item onClick={() => { setCurrentPage(currentPage - 1) }}>{currentPage - 1}</Pagination.Item>
            </>}

            <Pagination.Item active>{currentPage}</Pagination.Item>


            {(currentPage +1 < maxPage) && <> <Pagination.Item onClick={() => { setCurrentPage(currentPage + 1) }}>{currentPage + 1}</Pagination.Item>
            </>}

            {(currentPage + 5 <= maxPage ) && <> <Pagination.Ellipsis onClick={() => { setCurrentPage(currentPage + 5) }} />
                </>
            }
            {currentPage < maxPage && <>
                <Pagination.Item onClick={() => { setCurrentPage(maxPage) }}>{maxPage}</Pagination.Item>
                <Pagination.Next onClick={() => { setCurrentPage(currentPage + 1) }} />
                <Pagination.Last onClick={() => { setCurrentPage(maxPage) }} />
            </>}

        </Pagination>
</>
};
export default PokemonPage;