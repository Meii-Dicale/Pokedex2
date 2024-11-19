import axios from 'axios';



function getPokemonDetail(url) {
    return axios.get(url)
}

function getPokemonType(type) {
    return axios.get(`https://pokeapi.co/api/v2/type/${type}`)
}


export default {getPokemonDetail, getPokemonType}