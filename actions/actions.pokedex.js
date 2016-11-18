import { Pokedex } from '../constants/Actions';
import { POKE_API_URL } from '../constants/Api';

function getPokemon() {
    return {
        type: Pokedex.GET_POKEMON,
    };
}

function receivePokemon(pokemon) {
    return {
        type: Pokedex.SUCCESS_POKEMON,
        pokemon
    }
}

function errorPokemon(error) {
    return {
        type: Pokedex.ERROR_POKEMON,
        error
    }
}

export function fetchPokemon() {
    return dispatch => {
        dispatch(getPokemon());
        return fetch(`${POKE_API_URL}/pokemon/`)
            .then(response => response.json())
            .then(resource => dispatch(receivePokemon(resource.results)))
            .catch(error => dispatch(errorPokemon(error)))
    }
}