import logo from '../../img/logo.png';
import styles from './nav.module.css';

import { Link } from 'react-router-dom';


const Nav = () => {

   

    return (
        <>
            <nav className={styles.nav}>
                <div className={styles.container}>
                    <Link to="/home" ><img src={logo} className={styles.logo} alt="logo" /></Link>
                    
                    <Link to="/home/pokemon/create" className={styles.btnCreatePokemon}>CREAR POKÉMON</Link>
                </div>
            </nav>
        </>
    )
}

export default Nav;