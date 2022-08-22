import axios from "axios";


const baseUrl=process.env.REACT_APP_API || 'http://localhost:3001';

export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const GET_TYPES = 'GET_TYPES';
export const FILTER_TYPES = 'FILTER_TYPES';
export const FILTER_EXIST_DB = 'FILTER_EXIST_DB';
export const ORDER_NAME = 'ORDER_NAME';
export const SEARCH_NAME = 'SEARCH_NAME';
export const GET_POKEMON='GET_POKEMON';
export const LOADER='LOADER';
//http://github.com/timanovsky/subdir-heroku-buildpack
//PROJECT_PATH

export const getAllPokemons = () => async (dispatch) => {

    dispatch({type:LOADER,payload:true});

    return await fetch(baseUrl+'/pokemons')
        .then(r => r.json())
        .then(data => {
            dispatch({
                type: GET_ALL_POKEMONS,
                payload: data
            })

            dispatch({
                type:LOADER,
                payload:false
            })
        })
}

export const getPokemon = (idPokemon) => async (dispatch) => {
    dispatch({type:LOADER,payload:true})
    return await axios.get(baseUrl+'/pokemons/' + idPokemon)
        .then(res => {
            dispatch({
                type: GET_POKEMON,
                payload: res.data
            })
            dispatch({type:LOADER,payload:false})
        })
}

export const createPokemon=(objPokemon)=>async (dispatch)=>{
 const response=await axios.post(baseUrl+"/pokemons",objPokemon)
 console.log(response)
 return response
}

export const getAllTypes = () => async (dispatch) => {
    return await fetch(baseUrl+'/types')
        .then(r => r.json())
        .then(data => {
            dispatch({
                type: GET_TYPES,
                payload: data
            })
        })
}

export const searchName = (name) => async (dispatch) => {
    dispatch({type:LOADER,payload:true})
    return await fetch(baseUrl+'/pokemons?name=' + name)
        .then(r => r.json())
        .then(data => {
            dispatch({
                type: SEARCH_NAME,
                payload: data
            })
            dispatch({type:LOADER,payload:false})
        })
}

export const filterType = (tipo) => {
    return {
        type: FILTER_TYPES,
        payload: tipo
    }
}


export const filterExistDB = (value) => {
    return {
        type: FILTER_EXIST_DB,
        payload: value
    }
}

export const orderName = (value) => {
    return {
        type: ORDER_NAME,
        payload: value
    }
}