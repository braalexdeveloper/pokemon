import React, { useState } from "react";
import Pokemon from "../pokemon/pokemon";
import Pagination from "../pagination/pagination";
import FilterOrder from "../filterOrder/filterOrder";
import Loader  from "../loader/loader";
import { getAllPokemons,searchName } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import styles from './pokemons.module.css';
import { Link } from "react-router-dom";

const Pokemons = (props) => {


  const infoPokemons = useSelector(state => state.pokemons);
  let loader=useSelector(state=>state.loader)
  const dispatch = useDispatch();

  const [pagina, setPagina] = useState(1);
  const [inputPag,setInputPag]=useState(1);
  const [porPagina, setPorPagina] = useState(12);

  const [orden, setOrden] = useState("")

  let numMaxPag = Math.ceil(infoPokemons.length / porPagina);

  React.useEffect(() => {
    dispatch(getAllPokemons())

  }, [])


  

  const [input, setInput] = useState('');

  const handleInput = (e) => {
      e.preventDefault();
      /*if(e.target.value===""){
          dispatch(getAllPokemons())
      }*/
      setInput(e.target.value)
      
  }

  

  const handleSearch = (e) => {
     // e.preventDefault();
      dispatch(searchName(input))
      setInput('')
      
      setInputPag(1)
      setPagina(1)
  }

  const allPokemons = () => {
      dispatch(getAllPokemons())
  }

  return (
    <>
      <section>
        <div>
          <input onChange={(e) => handleInput(e)} value={input} className={styles.inputSearch} type="text" name="search" />

          <button onClick={(e) => handleSearch(e)} className={styles.btnSearch}>SEARCH</button>
          <button onClick={allPokemons} className={styles.btnAllPokemons}>CLEAR FILTERS</button>
        </div>
        <div className={styles.sectionFilters}>
          <FilterOrder setInputPag={setInputPag} setPagina={setPagina} setOrden={setOrden} />
        </div>
        <div>
          { !loader ? <Pagination inputPag={inputPag} setInputPag={setInputPag} pagina={pagina} setPagina={setPagina} numMaxPag={numMaxPag} /> : null}
          
        </div>
      </section>
      <section className={styles.section_pokemons}>
        { loader ? <Loader/> :
          infoPokemons.length > 0 ? infoPokemons && infoPokemons.slice((pagina - 1) * porPagina, (pagina - 1) * porPagina + porPagina).map(pokemon => (
            <Link className={styles.card} to={'/home/' + pokemon.id}><Pokemon key={pokemon.id} pokemon={pokemon} /></Link>
          )) :
           <p>{infoPokemons.msg} <a href="/home">VUELVE A CARGAR LOS POKEMONS </a><img src="https://c.tenor.com/cg3uVszc7IsAAAAj/pikachu-nope.gif" /></p>
        }


      </section>
    </>
  )
}

export default Pokemons;