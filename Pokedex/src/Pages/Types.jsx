import { Form, useLocation } from "react-router-dom";
import TypeService from "../Services/TypeService";
import { useEffect, useState } from "react";
import PokemonCard from "../Components/PokemonCard";
import Container from "react-bootstrap/esm/Container";
import FormControl from "react-bootstrap/esm/FormControl";

const TypePage = () => {
  const location = useLocation();
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // État pour la recherche

  const fetchAllPokemonByType = async () => {
    try {
      const response = await TypeService.getTypePokemon(location.state);
      console.log(response.data.pokemon);
      setPokemons(response.data.pokemon);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllPokemonByType();
  }, [location.state]);

  // Filtrer les pokémons en fonction de la recherche
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Container >
        <h1 style={{ textAlign: "center"}}>Type: {location.state}</h1>
        <div className="d-flex justify-content-center mt-4">
        <FormControl
          type="text"
          placeholder="Search a Pokemon..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Mise à jour de la recherche
          className="mb-3 search-bar w-50"
        />
        </div>
        <div className="d-flex flex-row flex-wrap justify-content-center align-items-center gap-5 mt-5 col-9">
        {filteredPokemons.map((pokemon) => (
          <PokemonCard pokemon={pokemon.pokemon} key={pokemon.pokemon.name} />
        ))}
        </div>
      </Container>
    </>
  );
};

export default TypePage;
