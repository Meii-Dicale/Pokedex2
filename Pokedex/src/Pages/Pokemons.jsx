import { useEffect, useState } from "react";
import PokemonService from "../Services/PokemonService";
import PokemonCard from "../Components/PokemonCard";
import Container from "react-bootstrap/esm/Container";
import Pagination from "react-bootstrap/esm/Pagination";
import Form from "react-bootstrap/esm/Form";

const PokemonPage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [limit] = useState(21);

  const fetchAllPokemons = async () => {
    try {
      // Récupérer tous les Pokémon (jusqu'à 1000)
      const response = await PokemonService.getAllPokemons(0, 1000);
      setPokemons(response.data.results);
      setFilteredPokemons(response.data.results); // Par défaut, tous les Pokémon
      setMaxPage(Math.ceil(response.data.results.length / limit));
    } catch (error) {
      console.error(error);
    }
  };

  // Charger tous les Pokémon au démarrage
  useEffect(() => {
    fetchAllPokemons();
  }, []);

  // Gestion de la recherche
  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredPokemons(filtered);
    setMaxPage(Math.ceil(filtered.length / limit)); // Recalcule le nombre max de pages
    setCurrentPage(1); // Reset la pagination si on effectue une recherche
  }, [searchQuery, pokemons, limit]);

  // Gestion des Pokémon affichés par page
  const paginatedPokemons = filteredPokemons.slice(
    (currentPage - 1) * limit,
    currentPage * limit
  );

  // Gestion du changement de page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
     
        <Container>
        <h1 style={{ textAlign: "center"}}>You can check out all the Pokemon here!</h1>
          {/* Barre de recherche */}
          <div className="d-flex justify-content-center mt-4">
            <Form.Control
              type="text"
              placeholder="Search a Pokemon..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-bar w-50"
            />
          </div>

          {/* Liste des Pokémon */}
          <div className="   d-flex  flex-wrap justify-content-center gap-5 mt-5 col-9 ">
            {paginatedPokemons.length > 0 ? (
              paginatedPokemons.map((pokemon) => (
                <PokemonCard pokemon={pokemon} key={pokemon.name} />
              ))
            ) : (
              <p className="text-center mt-5">Aucun Pokémon trouvé</p>
            )}
          </div>
        </Container>
      

      {/* Pagination */}
      <div className="d-flex align-items-center justify-content-center">
        <Pagination className="mt-5">
          {currentPage > 1 && (
            <>
              <Pagination.First onClick={() => handlePageChange(1)} />
              <Pagination.Prev
                onClick={() => handlePageChange(currentPage - 1)}
              />
              {currentPage > 2 && (
                <Pagination.Item onClick={() => handlePageChange(1)}>
                  1
                </Pagination.Item>
              )}
            </>
          )}
          {currentPage > 3 && <Pagination.Ellipsis />}
          {currentPage > 1 && (
            <Pagination.Item onClick={() => handlePageChange(currentPage - 1)}>
              {currentPage - 1}
            </Pagination.Item>
          )}
          <Pagination.Item active>{currentPage}</Pagination.Item>
          {currentPage < maxPage && (
            <Pagination.Item onClick={() => handlePageChange(currentPage + 1)}>
              {currentPage + 1}
            </Pagination.Item>
          )}
          {currentPage < maxPage - 2 && <Pagination.Ellipsis />}
          {currentPage < maxPage && (
            <>
              <Pagination.Item onClick={() => handlePageChange(maxPage)}>
                {maxPage}
              </Pagination.Item>
              <Pagination.Next
                onClick={() => handlePageChange(currentPage + 1)}
              />
              <Pagination.Last onClick={() => handlePageChange(maxPage)} />
            </>
          )}
        </Pagination>
      </div>
    </>
  );
};

export default PokemonPage;
