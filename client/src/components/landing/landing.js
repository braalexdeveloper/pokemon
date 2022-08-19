import styles from "./landing.module.css";
import { Link } from "react-router-dom";


const Landing = () => {
    return (
        <>
            <div className={styles.fondo}>
                     
                <Link to="/home" className={styles.btnEntrar}>ENTRAR</Link>
            </div>
        </>
    )

}

export default Landing;