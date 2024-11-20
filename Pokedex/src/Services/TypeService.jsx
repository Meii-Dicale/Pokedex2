import axios from "axios";

function getAllType() {
    return axios.get(`https://pokeapi.co/api/v2/type/`)
}
function getTypePokemon(type) {
    return axios.get(`https://pokeapi.co/api/v2/type/${type}`)
}

export default {getAllType, getTypePokemon}