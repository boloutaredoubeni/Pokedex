import { Pokedex } from '../constants/Actions';

export default function pokedex(state={
    isFetching: false,
    pokemon: []
}, action) {
    switch (action.type) {
        case Pokedex.GET_POKEMON:
            return {
                ...state,
                isFetching: true
            }
        case Pokedex.SUCCESS_POKEMON:
            return {
                ...state,
                pokemon: action.pokemon,
                isFetching: false
            }
        case Pokedex.ERROR_POKEMON:
            return {
                ...state,
                isFetching: false
            }
        default:
            return state
    }
}
