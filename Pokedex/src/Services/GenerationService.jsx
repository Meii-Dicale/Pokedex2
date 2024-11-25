import axios from "axios";

function getAllGeneration () {
    return axios.get(`https://pokeapi.co/api/v2/generation/`)
}

export default {
    getAllGeneration,
}