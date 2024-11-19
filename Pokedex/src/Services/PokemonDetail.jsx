import axios from 'axios';



function getPokemonDetail(url) {
    return axios.get(url)
}


export default {getPokemonDetail}