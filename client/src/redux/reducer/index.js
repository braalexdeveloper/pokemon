import {
    GET_ALL_POKEMONS,
    GET_TYPES,
    FILTER_TYPES,
    FILTER_EXIST_DB,
    ORDER_NAME,
    SEARCH_NAME,
    GET_POKEMON,
    LOADER
} from "../actions/index.js"; // Importa las actions types que necesites

const initialState = {
    pokemons: [],
    allPokemons: [],
    pokemon: {},
    types: [],
    loader: false
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_POKEMONS:
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }
        case GET_POKEMON:
            return {
                ...state,
                pokemon: action.payload
            }
        case 'POST_POKEMON':
            return {
                ...state,
            }
        case SEARCH_NAME:
            return {
                ...state,
                pokemons: action.payload
            }
        case GET_TYPES:
            return {
                ...state,
                types: action.payload
            }
        case FILTER_TYPES:

            let pokemonsFilters = state.allPokemons;
            if (action.payload !== "All") {
                pokemonsFilters = pokemonsFilters.filter(el => el.types.includes(action.payload))
            }
            return {
                ...state,
                pokemons: pokemonsFilters
            }
        case FILTER_EXIST_DB:

            let pokemonsFilters_Exist_DB = action.payload === "Mibd" ? state.allPokemons.filter(el => el.fromDB) : state.allPokemons.filter(el => !el.fromDB)
            return {
                ...state,
                pokemons: action.payload === "All" ? state.allPokemons : pokemonsFilters_Exist_DB
            }
        case ORDER_NAME:


            let orderPokemons = action.payload === "ID" ? state.pokemons.sort(function (a, b) {
                return a.id - b.id
            }) :
                action.payload === "Asc" ? state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (a.name < b.name) {
                        return -1;
                    }
                    // a must be equal to b
                    return 0;
                }) :
                    action.payload === "Desc" ? state.pokemons.sort(function (a, b) {
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (a.name < b.name) {
                            return 1;
                        }
                        // a must be equal to b
                        return 0;
                    }) :
                        action.payload === "maxAttack" ? state.pokemons.sort(function (a, b) {

                            return b.attack - a.attack
                        }) :
                            state.pokemons.sort(function (a, b) {
                                return a.attack - b.attack
                            })

            return {
                ...state,
                pokemons: orderPokemons
            }
        case LOADER:
            return {
                ...state,
                loader: action.payload
            }
        default:
            return state
    }
}

export default rootReducer;



