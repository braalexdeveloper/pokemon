const axios = require('axios');
//const Pokemon = require('../models/Pokemon');
const { Pokemon, Tipo } = require('../db.js');

const pokemonsApi = async () => {
    const info = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=40')
        .then(res => res.data)
//if(info.length>0){
     const pokemonsAwaits = info.results.map((el) => {

        return axios.get(el.url);

    });

    const pokemonsApi = await axios.all(pokemonsAwaits).then(result => {
        let pokemonsData = result.map((info) => {

            return {
                id: info.data.id,
                name: info.data.name,
                image: info.data.sprites.other.home.front_default,
                attack:info.data.stats[1].base_stat,
                types: info.data.types.map(t => t.type.name)
            }

        })

        return pokemonsData
    });

    return pokemonsApi;
/*}else{
    return []
}*/
    
}

const pokemonsDB = async () => {
    const pokemonDB = await Pokemon.findAll({
        include: {
            model: Tipo,
            attributes: ['name'],
            through: {
                attributes: [],
            }
        }
    })

    let infoPokemons=pokemonDB.map(p => {
        let objPokemon={
            id:p.id,
            name:p.name,
            types:p.tipos.map(t => t.name),
            attack:p.attack,
            image:p.image,
            fromDB:p.fromDB
        }
        return objPokemon;
    })

    return infoPokemons

   
}

const allPokemons = async () => {
    let pokemonApi = await pokemonsApi();
    let pokemonBD = await pokemonsDB();

    return [...pokemonApi, ...pokemonBD]
}

const getPokemonApi = async (idPokemon) => {
    let info = await axios.get('https://pokeapi.co/api/v2/pokemon/' + idPokemon).then(res => res.data);
    let pokemonApi = {
        id: info.id,
        name: info.name,
        image: info.sprites.other.home.front_default,
        life: info.stats[0].base_stat,
        attack: info.stats[1].base_stat,
        defense: info.stats[2].base_stat,
        speed: info.stats[5].base_stat,
        height: info.height,
        weight: info.weight,
        types: info.types.map(p => p.type.name)
    }
    return pokemonApi;
}

const getNamePokemonApi = async (name) => {
    let info = await axios.get('https://pokeapi.co/api/v2/pokemon/' + name).then(res => res.data);
    let pokemonApi = {
        id: info.id,
        name: info.name,
        image: info.sprites.other.home.front_default,
        life: info.stats[0].base_stat,
        attack: info.stats[1].base_stat,
        defense: info.stats[2].base_stat,
        speed: info.stats[5].base_stat,
        height: info.height,
        weight: info.weight,
        types: info.types.map(p => p.type.name)
    }
    
     return [pokemonApi]


    
}

const getPokemonBd = async (idPokemon) => {
    let pokemonBD = await Pokemon.findOne({
        where: {
            id: idPokemon
        },
        include: {
            model: Tipo,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    })

    let objPokemon={
            id:pokemonBD.id,
            name:pokemonBD.name,
            types:pokemonBD.tipos.map(t => t.name),
            attack:pokemonBD.attack,
            image:pokemonBD.image,
            life:pokemonBD.life,
            defense:pokemonBD.defense,
            speed:pokemonBD.speed,
            height:pokemonBD.height,
            weight:pokemonBD.weight,
            fromDB:pokemonBD.fromDB
        }

    return objPokemon
}

const postPokemon=async (name, life, attack, defense, speed, height, weight,image, types) => {
   

    let existPokemon= await Pokemon.findOne({
        where:{
            name
        }
    });

    if(existPokemon) throw `${name} ya Existe`;


    const newPokemon = await Pokemon.create({
        name,
        life,
        attack,
        defense,
        speed,
        height,
        weight,
        image
      });

      let tipo = await Tipo.findAll({
        where: {
          name: types
        }
      })
    
      newPokemon.addTipo(tipo);

      return "Pokemon creado con exito"
}

const getTypes = async () => {
    const tipos = await axios.get('https://pokeapi.co/api/v2/type');
    tipos.data.results.forEach(async el => await Tipo.findOrCreate({ where: { name: el.name } }));
    const allTypes = await Tipo.findAll();
    return allTypes
}

module.exports = {
    pokemonsApi,
    pokemonsDB,
    allPokemons,
    getPokemonApi,
    getNamePokemonApi,
    getPokemonBd,
    getTypes,
    postPokemon
};