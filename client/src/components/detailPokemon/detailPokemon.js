import { getPokemon } from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import styles from "./detailPokemon.module.css"
import { Link } from "react-router-dom";

import Loader from "../loader/loader";

const DetailPokemon = (props) => {
    const infoPokemon = useSelector(state => state.pokemon);
    let loader=useSelector(state=> state.loader);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPokemon(props.idPokemon))
    }, [])

    const urlImgDefect = "https://i.pinimg.com/originals/95/d5/cd/95d5cded00f3a3e8a98fb1eed568aa9f.png";
    return (
        
        loader ? <Loader/> :
        <>
          <Link className={styles.btnAllPokemons} to="/home">VIEW ALL POKEMONS</Link>
          <div className={styles.detail}>
          
              <img src={infoPokemon.image ? infoPokemon.image: urlImgDefect } alt={infoPokemon.name} />
              <h2>{infoPokemon.name}</h2>
              <div className={styles.skills}>

                  <div className={styles.skill}>
                      <span>HEIGHT</span>
                      <span>{infoPokemon.height} M</span>
                      <div className={styles.clearfix}></div>
                      
                  </div>

                  <div className={styles.skill}>
                      <span>WEIGHT</span>
                      <span>{infoPokemon.weight} KG</span>
                      <div className={styles.clearfix}></div>
                      
                  </div>



                  <div className={styles.skill}>
                      <span>LIFE</span>
                      <span>{infoPokemon.life}</span>
                      <div className={styles.clearfix}></div>
                      <meter className={styles.nivelT} min="0" max="100" low="1" high="100" optimum="100" value={infoPokemon.life} />
                  </div>

                  <div className={styles.skill}>
                      <span>ATTACK</span>
                      <span>{infoPokemon.attack}</span>
                      <div className={styles.clearfix}></div>
                      <meter className={styles.nivelT} min="0" max="100" low="1" high="100" optimum="100" value={infoPokemon.attack} />
                  </div>

                  <div className={styles.skill}>
                      <span>DEFENSE</span>
                      <span>{infoPokemon.defense}</span>
                      <div className={styles.clearfix}></div>
                      <meter className={styles.nivelT} min="0" max="100" low="1" high="100" optimum="100" value={infoPokemon.defense} />
                  </div>

                  <div className={styles.skill}>
                      <span>SPEED</span>
                      <span>{infoPokemon.speed}</span>
                      <div className={styles.clearfix}></div>
                      <meter className={styles.nivelT} min="0" max="100" low="1" high="100" optimum="100" value={infoPokemon.speed} />
                  </div>
                  
              </div>

              <div className={styles.types}>
                      <span>Types</span>
                      <div>
                          {infoPokemon.types && infoPokemon.types.map(el => (
                             <span>{el}</span> 
                          ))}
                      </div>
                  </div>

          </div>
        
            

        </>
    )
}

export default DetailPokemon;