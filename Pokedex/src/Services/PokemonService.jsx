import axios from "axios";

const API_BASE_URL = "https://pokeapi.co/api/v2";

const PokemonService = {
  getAllPokemons: (offset, limit) =>
    axios.get(`${API_BASE_URL}/pokemon?offset=${offset}&limit=${limit}`),

  searchPokemonByName: async (name) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/pokemon/${name}`);
      return response.data;
    } catch {
      return null; 
    }
  },
};

export default PokemonService;
