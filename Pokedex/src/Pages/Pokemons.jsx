import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"; // Importez useSearchParams
import PokemonService from "../Services/PokemonService";
import PokemonCard from "../Components/PokemonCard";
import Container from "react-bootstrap/esm/Container";
import Pagination from "react-bootstrap/esm/Pagination";

const PokemonPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(200);
  const [maxPage, setMaxPage] = useState(250);
  const [pokemons, setPokemons] = useState([]);
  const [searchParams] = useSearchParams(); // Utilisez les paramètres de recherche
  const searchQuery = searchParams.get("search"); // Récupérez le terme de recherche

  const fetchPokemons = async () => {
    try {
       
      if (searchQuery) {
        // Si une recherche est active
        const response = await PokemonService.searchPokemonByName(searchQuery);
        setPokemons(response ? [response] : []); // Met à jour avec le Pokémon trouvé ou vide
        setMaxPage(1); // Une seule page en cas de recherche
      } else {
        // Si aucune recherche, on charge les Pokémons par page
        const offset = (currentPage - 1) * limit;
        const response = await PokemonService.getAllPokemons(offset, limit);
        setPokemons(response.data.results);
        setMaxPage(Math.ceil(response.data.count / limit));
        console.log(response.data.results)
      }
      
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPokemons();
  }, [currentPage, searchQuery]); // Recharger lors d'un changement de page ou de recherche

  return (
    <>
      <div className="background-container">
        <Container className="d-flex align-item-center justify-content-center"> 
          <div className="d-flex flex-row flex-wrap justify-content-center align-item-center gap-5 mt-5 col-9">
            {pokemons.length > 0 ? (
              pokemons.map((pokemon) => (
                <PokemonCard pokemon={pokemon} key={pokemon.name} />
              ))
            ) : (
              <p>Aucun Pokémon trouvé</p>
            )}
          </div>
        </Container>
      </div>
<div className="d-flex align-item-center justify-content-center">
      {!searchQuery && (
        <Pagination className="mt-5">
          {currentPage > 1 && (
            <>
              <Pagination.First onClick={() => setCurrentPage(1)} />
              <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} />
              <Pagination.Item onClick={() => setCurrentPage(1)}>
                {1}
              </Pagination.Item>
            </>
          )}

          {currentPage - 5 > 0 && (
            <Pagination.Ellipsis
              onClick={() => setCurrentPage(currentPage - 5)}
            />
          )}
          {currentPage !== 2 && currentPage > 1 && (
            <Pagination.Item onClick={() => setCurrentPage(currentPage - 1)}>
              {currentPage - 1}
            </Pagination.Item>
          )}

          <Pagination.Item active>{currentPage}</Pagination.Item>

          {currentPage + 1 < maxPage && (
            <Pagination.Item onClick={() => setCurrentPage(currentPage + 1)}>
              {currentPage + 1}
            </Pagination.Item>
          )}

          {currentPage + 5 <= maxPage && (
            <Pagination.Ellipsis
              onClick={() => setCurrentPage(currentPage + 5)}
            />
          )}
          {currentPage < maxPage && (
            <>
              <Pagination.Item onClick={() => setCurrentPage(maxPage)}>
                {maxPage}
              </Pagination.Item>
              <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} />
              <Pagination.Last onClick={() => setCurrentPage(maxPage)} />
            </>
          )}
        </Pagination>
      )}
      </div>
    </>
  );
};

export default PokemonPage;
