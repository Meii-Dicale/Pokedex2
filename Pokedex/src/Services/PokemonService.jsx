import axios from "axios";



const PokemonService = {
  getAllPokemons: (offset, limit) =>
    axios.get(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`),

  searchPokemonByName: async (name) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
      return response.data;
    } catch {
      return null; 
    }
  },
};

export default PokemonService;
