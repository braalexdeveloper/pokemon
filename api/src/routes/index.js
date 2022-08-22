const { Router } = require('express');
//const axios = require('axios');
//const { Pokemon, Tipo } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { allPokemons, getPokemonApi,
  getPokemonBd, getTypes, postPokemon,getNamePokemonApi,pokemonsDB,getNamePokemonBD } = require('../controllers/index.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/pokemons', async (req, res) => {

  try {

    const name = req.query.name;

    
    if (name) {


        /*let pokemon = await pokemonsDB().then((res) =>
        res.filter(
          (p) => p.name.toLowerCase().trim().includes(name.toLowerCase().trim()) 
        )
      );*/
      let pokemon=await getNamePokemonBD(name);
               
        if(pokemon.length > 0){ 
          return res.status(200).json(pokemon)
        }
        else {
          let pokemonApi=await getNamePokemonApi(name.toLowerCase());
      console.log(pokemonApi)
      if(pokemonApi){ 
        
         return res.status(200).json(pokemonApi)
      }
          
        }
     
      
    } else {
      const allPokemon = await allPokemons();
      if(allPokemon.length >0) return res.status(200).json(allPokemon)
        else return res.status(404).json({msg:"No cargaron los pokemones, Actualice neuvamente!!"});
    }

  } catch (error) {

    res.status(404).json({msg:"No se encontro el Pokémon"})
  }
})

router.get('/pokemons/:idPokemon', async (req, res) => {

  try {
    const { idPokemon } = req.params;

    if (idPokemon >= 0 && typeof Number(idPokemon) === 'number') {

      let pokemonApi = await getPokemonApi(idPokemon);
      console.log(pokemonApi)
      return res.status(200).json(pokemonApi);

    } else {

      let pokemonBD = await getPokemonBd(idPokemon);
      console.log(pokemonBD)
      return res.status(200).json(pokemonBD)

    }
  } catch (error) {
    return res.status(500).send(error)
  }


})

router.post('/pokemons', async (req, res) => {
 try {
    const { name, life, attack, defense, speed, height, weight,image, types } = req.body;
    const newPokemon = await postPokemon(name, life, attack, defense, speed, height, weight,image, types);

    res.status(200).json({msg:newPokemon})
 } catch (error) {
   res.status(400).json({error:error})
  }

})


router.get('/types', async (req, res) => {
  try {
    const types = await getTypes();
    res.status(200).json(types)
  } catch (error) {
    res.status(500).send("Error in getTypes:" + error.message);
  }

})

module.exports = router;
